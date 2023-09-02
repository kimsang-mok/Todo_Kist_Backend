import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    complete: {
        type: Boolean,
        default: false
    },
    priority: {
        type: String,
        default: "None"
    },
    description: {
        type: String,
        default: ""
    }
});

const Item = mongoose.model("Item", ItemSchema);

const ListSchema = mongoose.Schema({
    name: String,
    items: [ItemSchema]
});

const List = mongoose.model("List", ListSchema)

const groupSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

const Group = mongoose.model("Group", groupSchema)

export { Item, List, Group }