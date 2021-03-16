import React, { FunctionComponent, useState } from "react";
import {
  ButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Label,
} from "reactstrap";

import style from "./style.module.scss";
import { IBCChannelRegistrarModal } from "./ibc-channel-registrar-modal";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores";
import { IIBCChannelConfig } from "@keplr-wallet/hooks";

export const DestinationChainSelector: FunctionComponent<{
  ibcChannelConfig: IIBCChannelConfig;
}> = observer(({ ibcChannelConfig }) => {
  const { chainStore, ibcChannelStore } = useStore();
  const ibcChannelInfo = ibcChannelStore.get(chainStore.current.chainId);

  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  const [isIBCRegisterModalOpen, setIsIBCregisterModalOpen] = useState(false);

  const [selectorId] = useState(() => {
    const bytes = new Uint8Array(4);
    crypto.getRandomValues(bytes);
    return `destination-${Buffer.from(bytes).toString("hex")}`;
  });

  return (
    <React.Fragment>
      <IBCChannelRegistrarModal
        isOpen={isIBCRegisterModalOpen}
        closeModal={() => setIsIBCregisterModalOpen(false)}
        toggle={() => setIsIBCregisterModalOpen((value) => !value)}
      />
      <FormGroup>
        <Label for={selectorId} className="form-control-label">
          Destination Chain
        </Label>
        <ButtonDropdown
          id={selectorId}
          className={style.chainSelector}
          isOpen={isSelectorOpen}
          toggle={() => setIsSelectorOpen((value) => !value)}
        >
          <DropdownToggle caret>
            {ibcChannelConfig.channel
              ? chainStore.getChain(
                  ibcChannelConfig.channel.counterpartyChainId
                ).chainName
              : "Select Chain"}
          </DropdownToggle>
          <DropdownMenu>
            {ibcChannelInfo.getTransferChannels().map((channel) => {
              if (!chainStore.hasChain(channel.counterpartyChainId)) {
                return undefined;
              }

              const chainInfo = chainStore.getChain(
                channel.counterpartyChainId
              );

              if (chainInfo) {
                return (
                  <DropdownItem
                    key={chainInfo.chainId}
                    onClick={(e) => {
                      e.preventDefault();

                      ibcChannelConfig.setChannel(channel);
                    }}
                  >
                    {`${chainInfo.chainName} (${channel.channelId})`}
                  </DropdownItem>
                );
              }
            })}
            <DropdownItem
              onClick={(e) => {
                e.preventDefault();

                setIsIBCregisterModalOpen(true);
              }}
            >
              <i className="fas fa-plus-circle my-1 mr-1" /> New IBC Transfer
              Channel
            </DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </FormGroup>
    </React.Fragment>
  );
});
