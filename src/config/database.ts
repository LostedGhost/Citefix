import mongoose from 'mongoose';

export const connectToDatabase = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/citefix');
    console.log('✅ Connexion à MongoDB réussie');
  } catch (error) {
    console.error('❌ Échec de la connexion à MongoDB :', error);
    process.exit(1);
  }
};
