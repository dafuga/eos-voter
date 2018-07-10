// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Decimal } from 'decimal.js';
import { Popup } from 'semantic-ui-react';

import FormFieldToken from '../../../../Global/Form/Field/Token';
import calculateAmountOfRam from './helpers/calculateAmountOfRam';

const prettyBytes = require('pretty-bytes');

class WalletPanelFormRamBuyByAmount extends Component<Props> {
  constructor(props) {
    super(props);

    const {
      priceOfRam
    } = this.props;

    this.state = {
      amountOfRam: 0,
      priceOfRam
    };
  }

  onConfirm = () => {
    const {
      onConfirm
    } = this.props;

    onConfirm();
  }

  onChange = (e, { value }) => {
    const {
      globals,
      onChange
    } = this.props;

    const decPrice = Decimal(value.split(' ')[0]);

    const decBaseBal = Decimal(globals.ram.base_balance);
    const decQuoteBal = Decimal(globals.ram.quote_balance);

    let amountOfRam = 0;

    if (decPrice.greaterThan(0)) {
      const decAmount = calculateAmountOfRam(decBaseBal, decQuoteBal, decPrice);
      amountOfRam = decAmount.floor();
    }

    onChange(amountOfRam, decPrice);

    this.setState({
      amountOfRam,
      priceOfRam: decPrice
    });
  }

  render() {
    const {
      formError,
      t
    } = this.props;

    const {
      amountOfRam,
      priceOfRam
    } = this.state;

    return (
      <div>
        <FormFieldToken
          autoFocus
          label={t('ram_form_label_amount_in_eos')}
          loading={false}
          name="ram_to_buy"
          onChange={this.onChange}
          defaultValue={priceOfRam && priceOfRam.toFixed(4)}
        />
        {(amountOfRam && !formError) ? (
          <h4 style={{ textAlign: 'center', margin: '10px' }}>
            {t('ram_form_text_amount_estimate')}
            <Popup
              content={`${amountOfRam.toFixed(0)} B`}
              inverted
              trigger={
                <span>
                  {` ${prettyBytes(Number(amountOfRam))}.`}
                </span>
              }
            />
          </h4>
        ) : ''}
      </div>
    );
  }
}

export default translate('ram')(WalletPanelFormRamBuyByAmount);
