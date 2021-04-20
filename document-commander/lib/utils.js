
function applyMixins(model, arr_mixins) {

    arr_mixins.forEach((mixin) => {
      Object.getOwnPropertyNames(mixin.prototype).forEach((name) => {
        let value;
        
        value = Object.getOwnPropertyDescriptor(mixin.prototype, name);
        value = value || Object.create(null);
        
        Object.defineProperty(model.prototype, name, value);
      });
    });
}

export { applyMixins };