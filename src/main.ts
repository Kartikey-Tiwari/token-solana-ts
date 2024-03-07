import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { keypairIdentity } from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { userKeypair } from "./helpers";
import { generateSigner } from "@metaplex-foundation/umi";
import { createV1 } from "@metaplex-foundation/mpl-token-metadata";
import { percentAmount } from "@metaplex-foundation/umi";
import { TokenStandard } from "@metaplex-foundation/mpl-token-metadata";

const umi = createUmi("https://api.devnet.solana.com");

const keypair = umi.eddsa.createKeypairFromSecretKey(userKeypair.secretKey);

umi.use(keypairIdentity(keypair)).use(mplTokenMetadata());

const metadata = {
  name: "Solana Gold",
  symbol: "GOLDSOL",
  uri: "https://raw.githubusercontent.com/solana-developers/program-examples/new-examples/tokens/tokens/.assets/spl-token.json",
};

const mint = generateSigner(umi);
async function createMetadataDetails() {
  await createV1(umi, {
    mint,
    authority: umi.identity,
    name: metadata.name,
    symbol: metadata.symbol,
    uri: metadata.uri,
    sellerFeeBasisPoints: percentAmount(0),
    decimals: 9,
    tokenStandard: TokenStandard.Fungible,
  }).sendAndConfirm(umi);
}
