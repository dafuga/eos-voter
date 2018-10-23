// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Message, Segment } from 'semantic-ui-react';

import ActiveAndOwnerSame from './List/ActiveAndOwnerSame';
import ResourcesLow from './List/ResourcesLow';


const listItemsMapping = {
  active_and_owner_same: ActiveAndOwnerSame,
  resources_low: ResourcesLow
};

class RecommendationInterfaceList extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      t
    } = this.props;

    const recommendations = listItemsMapping.map((RecommendationComponent) => {
      return <RecommendationComponent {...this.props} />;
    }).filter((recommendation) => {
      return recommendation !== null;
    });

    return (
      <Segment basic>
        {(recommendations.length > 0) ? (
          recommendations
        ) : (
          <Message
            content={t('tools_delegations_none')}
            warning
          />
        )}
      </Segment>
    );
  }
}

export default translate('recommendations')(RecommendationInterfaceList);
