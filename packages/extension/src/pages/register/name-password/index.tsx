import React, { FunctionComponent } from "react";
import { RegisterSceneBox } from "../components/register-scene-box";
import { FormNamePassword, useFormNamePassword } from "../components/form";
import { useRegisterHeader } from "../components/header";
import {
  useSceneEvents,
  useSceneTransition,
} from "../../../components/transition";
import { observer } from "mobx-react-lite";

export const RegisterNamePasswordScene: FunctionComponent<{
  mnemonic?: string;
  privateKey?: string;
  bip44Path?: {
    account: number;
    change: number;
    addressIndex: number;
  };
}> = observer(({ mnemonic, privateKey, bip44Path }) => {
  const sceneTransition = useSceneTransition();

  const header = useRegisterHeader();
  useSceneEvents({
    onWillVisible: () => {
      header.setHeader({
        mode: "step",
        title: "Set Up Your Wallet",
        stepCurrent: 3,
        stepTotal: 6,
      });
    },
  });

  const form = useFormNamePassword();

  return (
    <RegisterSceneBox>
      <form
        onSubmit={form.handleSubmit((data) => {
          if (mnemonic && privateKey) {
            throw new Error("Both mnemonic and private key are provided");
          }

          if (mnemonic) {
            if (!bip44Path) {
              throw new Error("BIP44 path should be provided");
            }

            sceneTransition.replaceAll("finalize-key", {
              name: data.name,
              password: data.password,
              mnemonic: {
                value: mnemonic,
                bip44Path,
              },
            });
          }
        })}
      >
        <FormNamePassword {...form} />
      </form>
    </RegisterSceneBox>
  );
});