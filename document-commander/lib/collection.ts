
class Collection<Type> extends Array<Type> {
    add(item: Type) {
        this.push(item);
    }
}

export { Collection }