import NFT from "../../models/nft";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();
        const nftMint = body.account;
        await NFT.create({ nftMint });

        return NextResponse.json({ message: 'Minted' }, { status: 201 });

    } catch (e) {
        return NextResponse.json({ message: 'error', e }, { status: 500 });
    }
}

export async function GET() {
    try {
        const nftAddress = await NFT.find();
        return NextResponse.json({ nftAddress }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ message: 'error', e }, { status: 500 });
    }
}