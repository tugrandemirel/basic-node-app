const categories = [
    {id: "1", name: "Telefon", description: "Telefon kategorisi"},
    {id: "2", name: "Bilgisayar", description: "Bilgisayar kategorisi"},
    {id: "3", name: "Beyaz Eşya", description: "Beyaz Eşya kategorisi"}
]
exports = class Category{
    constructor(name, description) {
        this.id = (categories.length + 1).toString();
        this.name = name;
        this.description = description;
    }

    saveCategory() {
        categories.push(this)
    }

    static getAll(){
        return categories;
    }

    static getById(id){
        return categories.find(c => c.id === id);
    }

    static update(category){
        const index = categories.findIndex(c => c.id === category.id);
        categories[index].name = category.name;
        categories[index].description = category.description;
    }

    static deleteById(id){
        const index = categories.findIndex(c => c.id === id);
        categories.splice(index, 1);
    }
}