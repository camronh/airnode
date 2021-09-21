import { ethers } from 'ethers';

type Log = ethers.providers.Log;

// =================================================================
// Template requests
// =================================================================
export function buildMadeTemplateRequest(overrides?: Partial<Log>): Log {
  return {
    blockNumber: 11,
    blockHash: '0xc011187e6426a622c477a141e896eb54db6f095bc41b9274e43148891c6f8b38',
    transactionIndex: 0,
    removed: false,
    address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    data: '0x00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000007a69000000000000000000000000e7f1725e7734ce288f8367e1bb143e90bb3f0512e4a1b9c33b9dda81f38b6e84c1bf59fcf5dd197039efc34edfaa61cfeb01b21700000000000000000000000069e2b095fbac6c3f9e528ef21882b86bf1595181000000000000000000000000d5e6a768f1d23d30b386bb5c125dbe83a9c40c73000000000000000000000000e7f1725e7734ce288f8367e1bb143e90bb3f051248a4157c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000060316200000000000000000000000000000000000000000000000000000000000066726f6d000000000000000000000000000000000000000000000000000000004554480000000000000000000000000000000000000000000000000000000000',
    topics: [
      '0xeb39930cdcbb560e6422558a2468b93a215af60063622e63cbb165eba14c3203',
      '0x000000000000000000000000a30ca71ba54e83127214d3271aea8f5d6bd4dace',
      '0x3d6050c73a683a5c6fb7bd2eb6ffa930879c2de901ea9e399001843b5f7953e9',
    ],
    transactionHash: '0xa304019e61d2215b01a11b0b96c00a7337ebea8151e22624fd7ed7da4bd80334',
    logIndex: 0,
    ...overrides,
  };
}

export function buildTemplateFulfilledRequest(overrides?: Partial<Log>): Log {
  return {
    blockNumber: 14,
    blockHash: '0xf33453ea70a4470256056e23dcde0974d3820fdc81c7686e45a27a9c7ec95c73',
    transactionIndex: 0,
    removed: false,
    address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    data: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000044fcf02',
    topics: [
      '0xd1cc11d12363af4b6022e66d14b18ba1779ecd85a5b41891349d530fb6eee066',
      '0x000000000000000000000000a30ca71ba54e83127214d3271aea8f5d6bd4dace',
      '0x3d6050c73a683a5c6fb7bd2eb6ffa930879c2de901ea9e399001843b5f7953e9',
    ],
    transactionHash: '0xa75acf2a72035f0bcf01c4fa9eb49015fdf8e266d2090cc40465589402dd49f1',
    logIndex: 0,
    ...overrides,
  };
}

// =================================================================
// Full requests
// =================================================================
export function buildMadeFullRequest(overrides?: Partial<Log>): Log {
  return {
    blockNumber: 12,
    blockHash: '0xe2f4359ac41c9093a3597247c5fb7a79554e3b9fa54a03d41fe0ad87ed436be8',
    transactionIndex: 0,
    removed: false,
    address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    data: '0x00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000007a69000000000000000000000000e7f1725e7734ce288f8367e1bb143e90bb3f0512eddc421714e1b46ef350e8ecf380bd0b38a40ce1a534e7ecdf4db7dbc931935300000000000000000000000069e2b095fbac6c3f9e528ef21882b86bf1595181000000000000000000000000d5e6a768f1d23d30b386bb5c125dbe83a9c40c73000000000000000000000000e7f1725e7734ce288f8367e1bb143e90bb3f051248a4157c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000160316262626262000000000000000000000000000000000000000000000000000066726f6d000000000000000000000000000000000000000000000000000000004554480000000000000000000000000000000000000000000000000000000000746f00000000000000000000000000000000000000000000000000000000000055534400000000000000000000000000000000000000000000000000000000005f74797065000000000000000000000000000000000000000000000000000000696e7432353600000000000000000000000000000000000000000000000000005f70617468000000000000000000000000000000000000000000000000000000726573756c7400000000000000000000000000000000000000000000000000005f74696d657300000000000000000000000000000000000000000000000000003130303030300000000000000000000000000000000000000000000000000000',
    topics: [
      '0x3a52c462346de2e9436a3868970892956828a11b9c43da1ed43740b12e1125ae',
      '0x000000000000000000000000a30ca71ba54e83127214d3271aea8f5d6bd4dace',
      '0x4f3e86e26ca424168cc0c029de60483f18d51a8d7e977ddec5120b5421c6cbb0',
    ],
    transactionHash: '0xe2627f7c94f50948e4f4aed89e7885636ac9512abc6b050daff270aed9bb4639',
    logIndex: 0,
    ...overrides,
  };
}

export function buildFullFulfilledRequest(overrides?: Partial<Log>): Log {
  return {
    blockNumber: 16,
    blockHash: '0xe988c829a9c290cd8dc5dad97c6ccda2b0c57603aef7a495f59f1028de6fa8ed',
    transactionIndex: 0,
    removed: false,
    address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    data: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000044fcf02',
    topics: [
      '0xd1cc11d12363af4b6022e66d14b18ba1779ecd85a5b41891349d530fb6eee066',
      '0x000000000000000000000000a30ca71ba54e83127214d3271aea8f5d6bd4dace',
      '0x4f3e86e26ca424168cc0c029de60483f18d51a8d7e977ddec5120b5421c6cbb0',
    ],
    transactionHash: '0xdec2da79f17458ce43b406a367d93a1623b18ce60722c0be230cb482ee49bd71',
    logIndex: 0,
    ...overrides,
  };
}

// =================================================================
// Withdrawals
// =================================================================
export function buildRequestedWithdrawal(overrides?: Partial<Log>): Log {
  return {
    blockNumber: 13,
    blockHash: '0x3e10da7715b1b4c56d1f63838a346fc3894bd2959f854c2e66f3757ff0d442ae',
    transactionIndex: 0,
    removed: false,
    address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    data: '0x000000000000000000000000295e2190b3574ea6ab17b32abaf77badf2aa57c4',
    topics: [
      '0xd48d52c7c6d0c940f3f8d07591e1800ef3a70daf79929a97ccd80b4494769fc7',
      '0x000000000000000000000000a30ca71ba54e83127214d3271aea8f5d6bd4dace',
      '0x0000000000000000000000003409cf0ef3e984018819fd370a338f0bdc182239',
      '0xed9362918d8f2df5d4fbae9a684d0045914b90ff61f4d9ce1bad8fcce2f5e720',
    ],
    transactionHash: '0xf29db49ecc5e399a66c12943d4782c7404b70834500ee809266b8ad5b48c460a',
    logIndex: 0,
    ...overrides,
  };
}

export function buildFulfilledWithdrawal(overrides?: Partial<Log>): Log {
  return {
    blockNumber: 15,
    blockHash: '0xe79ff646f4199899d8c973659c4a0a417e9b27df41d27bfb1c9475ca68bae03e',
    transactionIndex: 0,
    removed: false,
    address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    data: '0x000000000000000000000000295e2190b3574ea6ab17b32abaf77badf2aa57c40000000000000000000000000000000000000000000000000ddee4b4aec1a000',
    topics: [
      '0xadb4840bbd5f924665ae7e0e0c83de5c0fb40a98c9b57dba53a6c978127a622e',
      '0x000000000000000000000000a30ca71ba54e83127214d3271aea8f5d6bd4dace',
      '0x0000000000000000000000003409cf0ef3e984018819fd370a338f0bdc182239',
      '0xed9362918d8f2df5d4fbae9a684d0045914b90ff61f4d9ce1bad8fcce2f5e720',
    ],
    transactionHash: '0x9d6af14f4c096e7b02ebb657af6cddc1dc67f02d1bc60fbb890e37841e65da38',
    logIndex: 0,
    ...overrides,
  };
}
