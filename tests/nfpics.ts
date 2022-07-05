import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Nfpics } from "../target/types/nfpics";

describe("nfpics", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Nfpics as Program<Nfpics>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
