import mongoose from 'mongoose';

const MONGOURI = process.env.MONOGO_URI;

let cached = (global as any).mongoose || { conn: null, promise:null }

export const connectToDatabase = async () => {
    if(cached.conn) return cached.conn;

    if(!MONGOURI) throw new Error('MongoDB_URI is Missing');

    cached.promise = cached.promise || mongoose.connect(MONGOURI, {
        dbName: "evently",
        bufferCommands: false,
    });

    cached.conn = await cached.promise;

    return cached.conn;
}