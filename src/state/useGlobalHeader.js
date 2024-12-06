import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const useGlobalHeader = create(
  immer((set) => ({
    setHeader: (name, value) => set(() => ({ [name]: value })),
  })),
);

export default useGlobalHeader;

export const captureHeader = (header) => (response) => {
  const value = response?.headers?.[header];
  if (value) {
    useGlobalHeader.getState().setHeader(header, value);
  }
  return response;
};
