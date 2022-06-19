export function cascade(...classes) {
    return classes.filter(Boolean).join(" ");
}
