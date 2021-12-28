export function useClass(...classes) {
    return classes.filter(Boolean).join(" ");
}
