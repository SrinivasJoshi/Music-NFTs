// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT1155 is ERC1155, Ownable {
    //contract address goes here and id will be dynamic and will be passed in the _mint function calls
    //example https://ipfs.io/ipfs/QmT51bbxTbSiYGcF2X39sG6DGYyAX2413A1sZfiACMgJGP?filename={id}.json
    //if the if id 1 then https://ipfs.io/ipfs/QmT51bbxTbSiYGcF2X39sG6DGYyAX2413A1sZfiACMgJGP?filename=1.json will return the data that needs to be minted
    constructor() ERC1155("") {}

    mapping(uint256 => string) internal _tokenURIs;
    mapping(uint256 => MarketItem) private idToMarketItem;
    mapping(address => mapping(uint256 => bool)) private userHasItem;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;

    struct MarketItem {
        uint256 tokenId;
        address payable creator;
        uint256 price;
        uint256 amount;
        bool isUpForSale;
        string tokenUri;
    }

    event MarketItemCreated(
        uint256 tokenId,
        address payable creator,
        uint256 price,
        uint256 amount,
        bool isUpForSale
    );

    function mintToken(
        string memory tokenURI,
        uint256 amount,
        uint256 price
    ) public returns (uint256) {
        require(price > 0, "Price must be at least 1 wei");
        uint256 newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId, amount, "");
        _setTokenUri(newItemId, tokenURI);
        _tokenIds.increment();

        idToMarketItem[newItemId] = MarketItem(
            newItemId,
            payable(msg.sender),
            price,
            amount,
            false,
            tokenURI
        );
        return newItemId;
    }

    //put the NFT on the market,except one(in js)
    function createMarketItem(uint256 tokenId) public {
        address creator = idToMarketItem[tokenId].creator;
        uint256 amount = idToMarketItem[tokenId].amount;
        uint256 price = idToMarketItem[tokenId].price;
        require(msg.sender==creator,"Not the creator of NFT");

        // setApprovalForAll(address(this), true);
        // safeTransferFrom(msg.sender, address(this), tokenId, amount, "");
        idToMarketItem[tokenId].isUpForSale=true;
        emit MarketItemCreated(
            tokenId,
            payable(msg.sender),
            price,
            amount,
            true
        );
    }

    /* Creates the sale of a marketplace item */
    /* Transfers ownership of the item, as well as funds between parties */
    function createMarketSale(uint256 tokenId) public payable {
        uint256 _price = idToMarketItem[tokenId].price;
        uint256 _amount = idToMarketItem[tokenId].amount;
        address _creator = idToMarketItem[tokenId].creator;
        bool _isUpForSale = idToMarketItem[tokenId].isUpForSale;

        require(_isUpForSale,"The item is not up for sale");
        require(
            msg.value >= _price,
            "Please submit the asking price in order to complete the purchase"
        );
        require(!userHasItem[msg.sender][tokenId],"You already own this NFT");
        userHasItem[msg.sender][tokenId] = true;
        idToMarketItem[tokenId].amount = _amount-1;
        _safeTransferFrom(_creator, msg.sender, tokenId, 1, "");
        
        (bool sent,) = _creator.call{value:msg.value}("");
        require(sent,"Eth not sent to creator");
    }

    /* Returns all unsold market items */
    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint256 itemCount = _tokenIds.current();
        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            if (idToMarketItem[i].isUpForSale == true) {
                MarketItem storage currentItem = idToMarketItem[i];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /* Returns only items that a user has purchased */
    function fetchMyNFTs() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (userHasItem[msg.sender][i]) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (userHasItem[msg.sender][i]) {
                MarketItem storage currentItem = idToMarketItem[i];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /* Returns only items a user has listed */
    function fetchItemsListed() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i].creator == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i].creator == msg.sender) {
                MarketItem storage currentItem = idToMarketItem[i];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    //To change the URL String after the contract is deployed
    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function _setTokenUri(uint256 tokenId, string memory tokenURI) private {
        _tokenURIs[tokenId] = tokenURI;
    }

    function onERC1155Received(
        address _operator,
        address _from,
        uint256 _id,
        uint256 _value,
        bytes calldata _data
    ) external returns (bytes4) {
        return
            bytes4(
                keccak256(
                    "onERC1155Received(address,address,uint256,uint256,bytes)"
                )
            );
    }
}