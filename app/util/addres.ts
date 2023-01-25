import {
  bufferToHex,
  isValidPrivate,
  privateToPublic,
  publicToAddress,
  toChecksumAddress,
} from '@ethereumjs/util';
import {randomBytes} from 'react-native-randombytes';

type NewEthreumAddress = {
  address: string;
  privateKey: string;
};

const generateKey = (): Buffer => {
  const privateKey = randomBytes(32);

  if (!isValidPrivate(privateKey)) {
    throw new Error(
      'Private key does not satisfy the curve requirements (ie. it is invalid)',
    );
  }

  return privateKey;
};

const getAddress = (privateKey: Buffer): string => {
  const publicKey = privateToPublic(privateKey);
  return toChecksumAddress(bufferToHex(publicToAddress(publicKey)));
};

const createAddress = (): NewEthreumAddress => {
  const privateKey = generateKey();
  const address = getAddress(privateKey);

  return {
    address: address,
    privateKey: privateKey.toString('hex'),
  };
};

export default createAddress;
