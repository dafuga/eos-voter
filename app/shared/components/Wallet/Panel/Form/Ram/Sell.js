// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Decimal } from 'decimal.js';

import { Segment, Form, Divider, Message, Button } from 'semantic-ui-react';

import WalletPanelFormRamSellConfirming from './Sell/Confirming';
import WalletPanelFormRamStats from './Stats';
import FormMessageError from '../../../../Global/Form/Message/Error';
import FormFieldToken from '../../../../Global/Form/Field/Token';

type Props = {
  actions: {},
  account: {},
  balance: {},
  system: {}
};

class WalletPanelFormRamSell extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    const { account } = props;

    this.state = {
      ramUsage: Decimal(account.ram_usage),
      ramQuota: Decimal(account.ram_quota),
      ramToSell: 0,
      confirming: false,
      formError: null,
      submitDisabled: true
    };
  }

  onSubmit = (e) => {
    if (!this.state.submitDisabled) {
      this.setState({
        confirming: true
      });
    }
    e.preventDefault();
    return false;
  }

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.onSubmit(e);

      e.preventDefault();
      return false;
    }
  }

  onError = (error) => {
    let errorMessage;

    if (error !== true) {
      errorMessage = error;
    }

    this.setState({
      submitDisabled: true,
      formError: errorMessage
    });
  }

  onChange = (name, ramToSell) => {
    this.setState({
      submitDisabled: false,
      formError: null,
      ramToSell: Decimal(ramToSell * 1000)
    }, () => {
      const error = this.errorsInForm();
      if (error) {
        this.onError(error);
      }
    });
  }

  errorsInForm = () => {
    const {
      ramQuota,
      ramUsage,
      ramToSell,
    } = this.state;

    const decimalRegex = /^\d+(\.\d{1,4})?$/;

    if (!decimalRegex.test(ramToSell)) {
      return 'ram_error_not_valid_ram_amount';
    }

    const decimalRamToSell = Decimal(ramToSell);

    if (!decimalRamToSell.greaterThan(0)) {
      return true;
    }

    const ramLeft = ramQuota.minus(decimalRamToSell);

    if (ramLeft.lessThan(ramUsage)) {
      return 'ram_error_using_more_than_usage';
    }

    return false;
  }

  onBack = () => {
    this.setState({
      confirming: false
    });
  }

  onConfirm = () => {
    const {
      account,
      actions
    } = this.props;

    const {
      ramToSell
    } = this.state;

    const {
      sellRam
    } = actions;

    this.setState({
      confirming: false
    });

    sellRam(account, ramToSell);
  }

  render() {
    const {
      account,
      onClose,
      system,
      t
    } = this.props;

    const {
      ramQuota,
      ramUsage,
      ramToSell,
      submitDisabled
    } = this.state;

    const shouldShowConfirm = this.state.confirming;
    const shouldShowForm = !shouldShowConfirm;

    return (
      <Segment
        loading={system.STAKE === 'PENDING'}
        style={{ minHeight: '100px' }}
      >
        {(shouldShowForm)
          ? (
            <div>
              <WalletPanelFormRamStats
                ramQuota={ramQuota}
                ramUsage={ramUsage}
              />
              <Form
                onKeyPress={this.onKeyPress}
                onSubmit={this.onSubmit}
              >
                <Form.Group>
                  <FormFieldToken
                    autoFocus
                    icon="database"
                    label={t('ram_amount_to_sell')}
                    loading={false}
                    name="ram_to_sell"
                    onChange={this.onChange}
                    defaultValue={0}
                  />
                </Form.Group>
                <FormMessageError
                  error={this.state.formError}
                />
                <Divider />
                <Message
                  icon="info circle"
                  info
                  content={t('undelegate_explanation')}
                />
                <Divider />
                <Button
                  content={t('cancel')}
                  color="grey"
                  onClick={onClose}
                />
                <Button
                  content={t('update_staked_coins')}
                  color="green"
                  disabled={submitDisabled}
                  floated="right"
                  primary
                />
              </Form>
            </div>
          ) : ''}

        {(shouldShowConfirm)
          ? (
            <WalletPanelFormRamSellConfirming
              account={account}
              ramQuota={ramQuota}
              ramToSell={ramToSell}
              onBack={this.onBack}
              onConfirm={this.onConfirm}
            />
          ) : ''}
      </Segment>
    );
  }
}


export default translate('ram')(WalletPanelFormRamSell);
