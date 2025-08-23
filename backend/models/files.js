import mongoose from "mongoose";

const colors = [
    "red", "orange", "amber", "yellow", "lime", "green",
    "emerald", "teal", "cyan", "sky", "blue", "indigo",
    "violet", "purple", "fuchsia", "pink", "rose"
];

// Random gradient generator
function generateRandomGradient() {
    const color1 = colors[Math.floor(Math.random() * colors.length)];
    let color2 = colors[Math.floor(Math.random() * colors.length)];

    // Make sure both ends of the gradient are different colors
    while (color1 === color2) {
        color2 = colors[Math.floor(Math.random() * colors.length)];
    }

    return `from-${color1}-500 to-${color2}-600`;
}

const fileSchema = new mongoose.Schema({
    hash:{type:String,require:true},
    url:{type:String, require:true},
    ownerAddress:{type:String, require:true},

    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    documentType: { type: String, required: true },
    name: { type: String, required: true },
    fileName:{type:String, require:true},
    size: { type: String },

    status: { type: String, default: "Verified" },
    color: { type: String },

    timestamp:{type:Date,default:Date.now}
})

fileSchema.pre("save", function (next) {
    if (!this.color) {
        this.color = generateRandomGradient();
    }
    next();
});

const Document = mongoose.model('Document', fileSchema)

export default Document
