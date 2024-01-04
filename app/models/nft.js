import mongoose, {Schema} from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const NftSchema = new Schema({
    nftMint: String
});

const NFT = mongoose.models.NFT || mongoose.model('NFT', NftSchema);

export default NFT;