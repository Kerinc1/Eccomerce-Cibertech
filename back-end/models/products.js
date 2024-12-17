const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    nameItem: { type: String, required: true },
    descriptionItem: { type: String, required: true },
    priceItem: { type: Number, required: true },
    quantityItem: { type: Number, required: true },
    image: { type: String, required: true },  // Almacenar solo la URL de la imagen
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Asocia cada producto con el ID del usuario
    ratings: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            rating: { type: Number, required: true, min: 1, max: 5 }
        }
    ], // Lista de calificaciones
    averageRating: { type: Number, default: 0 } // Promedio de calificaciones
});

// Middleware para recalcular el promedio de calificaciones antes de guardar
ItemSchema.pre('save', function(next) {
    if (this.ratings.length === 0) {
        this.averageRating = 0;
    } else {
        const sumRatings = this.ratings.reduce((sum, r) => sum + r.rating, 0);
        this.averageRating = sumRatings / this.ratings.length;
    }
    next();
});

const Item = mongoose.model("products", ItemSchema);

module.exports = Item;
