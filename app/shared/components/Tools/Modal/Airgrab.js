// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Segment, Header } from 'semantic-ui-react';

import GlobalTransactionModal from '../../Global/Transaction/Modal';

class ToolsModalDelegation extends Component<Props> {
  confirmClaim = () => {
    const  { actions } = this.props;

    actions.claimAirgrab();
  };

  render() {
    const {
      actions,
      airgrab,
      blockExplorers,
      onClose,
      onOpen,
      settings,
      system,
      t
    } = this.props;

    return (
      <GlobalTransactionModal
        actionName="AIRGRAB"
        actions={actions}
        blockExplorers={blockExplorers}
        button={false}
        content={(
          <Segment  basic>
            <Header
              content={t('tools_modal_airgrab_header', { symbol: airgrab.symbol })}
              subheader={t('tools_modal_airgrab_subheader')}
            />
            <Button
              onClick={this.confirmClaim}
              content={t('tools_modal_airgrab_button')}
            />
          </Segment>
        )}
        icon="sticky note outline"
        onClose={onClose}
        onOpen={onOpen}
        openModal
        settings={settings}
        system={system}
        title={t('tools_modal_airgrab_title')}
      />
    );
  }
}

export default translate('tools')(ToolsModalDelegation);
