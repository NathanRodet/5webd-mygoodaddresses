export type Address = {
    uid: string;
    address: string;
    addressName: string;
    isPrivate: boolean;
    description: string;
    userId: string;
    imageUri: string | null;
  }
export interface AddressListProps {
  addressId: string;
}
