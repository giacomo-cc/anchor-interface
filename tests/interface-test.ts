import * as anchor from "@project-serum/anchor";
import { assert } from "chai";
import * as nativeAssert from "assert";
import { CounterAuth } from "../target/types/counter_auth";
import { Counter } from "../target/types/counter";
import { Program } from "@project-serum/anchor";

describe("interface", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const counter = anchor.workspace.Counter as Program<Counter>;
  console.log("counter: " + counter.programId);
  const counterAuth = anchor.workspace.CounterAuth as Program<CounterAuth>;
  console.log("counter auth: " + counterAuth.programId);

  // it("Is initialized!", async () => {
  //   await counter.state.rpc.new(counterAuth.programId);

  //   const stateAccount = await counter.state.fetch();
  //   assert.isTrue(stateAccount.count.eq(new anchor.BN(0)));
  //   assert.isTrue(stateAccount.authProgram.equals(counterAuth.programId));
  // });

  // it("Should fail to go from even to even", async () => {
  //   await nativeAssert.rejects(
  //     async () => {
  //       await counter.state.rpc.setCount(new anchor.BN(4), {
  //         accounts: {
  //           authProgram: counterAuth.programId,
  //         },
  //       });
  //     },
  //     (err) => {
  //       if (err.toString().split("custom program error: 0x3a98").length !== 2) {
  //         return false;
  //       }
  //       return true;
  //     }
  //   );
  // });

  it("Should succeed to go from even to odd", async () => {
    const tx = await counter.rpc.setCount(new anchor.BN(3), {
      accounts: {
        authProgram: counterAuth.programId,
      },
    });
    console.log("tx: " + tx);
  });
});
