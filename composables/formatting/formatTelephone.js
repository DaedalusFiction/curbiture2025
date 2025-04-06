export default function useFormatTelephone(telephone) {
  return `(${telephone.slice(0, 3)}) ${telephone.slice(3, 6)}-${telephone.slice(
    6,
    10
  )}`;
}
