import React from 'react';
import {ChoiceList, LegacyCard as Card} from '@shopify/polaris';
import {useI18n} from '@shopify/react-i18n';

import type {Field} from '../../types';

import {PurchaseType} from '~/constants';

export interface PurchaseTypeCardProps {
  /**
   * The selected purchase type
   */
  purchaseType: Field<PurchaseType>;
}

export function PurchaseTypeCard({purchaseType}: PurchaseTypeCardProps) {
  const [i18n] = useI18n();
  return (
    <Card
      sectioned
      title={i18n.translate('DiscountAppComponents.PurchaseTypeList.title')}
    >
      <ChoiceList
        title={i18n.translate(
          'DiscountAppComponents.PurchaseTypeList.choiceList.title',
        )}
        titleHidden
        selected={[purchaseType.value]}
        choices={[
          {
            label: i18n.translate(
              'DiscountAppComponents.PurchaseTypeList.choiceList.oneTimePurchase',
            ),
            value: PurchaseType.OneTimePurchase,
          },
          {
            label: i18n.translate(
              'DiscountAppComponents.PurchaseTypeList.choiceList.subscription',
            ),
            value: PurchaseType.Subscription,
          },
          {
            label: i18n.translate(
              'DiscountAppComponents.PurchaseTypeList.choiceList.both',
            ),
            value: PurchaseType.Both,
          },
        ]}
        onChange={(purchaseTypeList) => {
          purchaseType.onChange(purchaseTypeList[0] as PurchaseType);
        }}
      />
    </Card>
  );
}
