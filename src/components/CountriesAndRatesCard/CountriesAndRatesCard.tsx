import React from 'react';
import {
  LegacyCard as Card,
  ChoiceList,
  Checkbox,
  InlineError,
} from '@shopify/polaris';
import {CurrencyCode, useI18n} from '@shopify/react-i18n';

import {SelectedItemsList} from '../SelectedItemsList';
import {CurrencyField} from '../CurrencyField';

import styles from './CountriesAndRatesCard.scss';
import {useLocalizeCountry} from './utilities';

import type {Field, PositiveNumericString, CountryCode, Country} from '~/types';
import {CountrySelectionType} from '~/constants';

const EXCLUDE_SHIPPING_RATES_FIELD_ID = 'excludeShippingRatesOverTextField';

export interface CountriesAndRatesCardProps {
  /**
   * Whether a discount applies to all countries or specific countries
   */
  countrySelectionType: Field<CountrySelectionType>;

  /**
   * Specific country codes that a discount applies to
   */
  selectedCountries: Field<CountryCode[]>;

  /**
   * If the discount only applies when shipping rates are under a certain amount
   */
  excludeShippingRates: Field<boolean>;

  /**
   * The maximum shipping rate where the discount applies
   */
  maximumShippingPrice: Field<PositiveNumericString>;

  /**
   * Widget that enables users to select countries (see docs for an example)
   */
  countrySelector: React.ReactNode;

  /**
   * The currency code used for the maxiumum shipping price input
   */
  currencyCode: CurrencyCode;
}

export function CountriesAndRatesCard({
  countrySelectionType,
  selectedCountries,
  maximumShippingPrice,
  excludeShippingRates,
  countrySelector,
  currencyCode,
}: CountriesAndRatesCardProps) {
  const [i18n] = useI18n();
  const localizeCountry = useLocalizeCountry();

  return (
    <Card
      title={i18n.translate(
        'DiscountAppComponents.CountriesAndRatesCard.title',
      )}
    >
      <Card.Section>
        <ChoiceList
          title={i18n.translate(
            'DiscountAppComponents.CountriesAndRatesCard.choiceList.title',
          )}
          titleHidden
          choices={[
            {
              value: CountrySelectionType.AllCountries,
              label: i18n.translate(
                'DiscountAppComponents.CountriesAndRatesCard.choiceList.all',
              ),
            },
            {
              value: CountrySelectionType.SelectedCountries,
              label: i18n.translate(
                'DiscountAppComponents.CountriesAndRatesCard.choiceList.selected',
              ),
            },
          ]}
          selected={[countrySelectionType.value]}
          onChange={(values: CountrySelectionType[]) =>
            countrySelectionType.onChange(values[0])
          }
        />
        {countrySelectionType.value ===
          CountrySelectionType.SelectedCountries && (
          <>
            <div className={styles.countrySelectorActivator}>
              {countrySelector}
            </div>
            <SelectedItemsList
              items={selectedCountries.value.map(localizeCountry)}
              renderItem={(item: Country) => <div>{item.name}</div>}
              onRemoveItem={(itemId: string) =>
                selectedCountries.onChange(
                  selectedCountries.value.filter(
                    (countryCode) => countryCode !== itemId,
                  ),
                )
              }
            />
          </>
        )}
      </Card.Section>
      <Card.Section
        title={i18n.translate(
          'DiscountAppComponents.CountriesAndRatesCard.excludeShippingRatesSection.title',
        )}
      >
        <Checkbox
          label={i18n.translate(
            'DiscountAppComponents.CountriesAndRatesCard.excludeShippingRatesSection.checkboxLabel',
          )}
          checked={excludeShippingRates.value}
          onChange={(value: boolean) => excludeShippingRates.onChange(value)}
        />
        {excludeShippingRates.value && (
          <>
            <div className={styles.ShippingRatesTextField}>
              <CurrencyField
                id={EXCLUDE_SHIPPING_RATES_FIELD_ID}
                currencyCode={currencyCode}
                error={Boolean(maximumShippingPrice.error)}
                labelHidden
                label={i18n.translate(
                  'DiscountAppComponents.CountriesAndRatesCard.excludeShippingRatesSection.checkboxLabel',
                )}
                onChange={maximumShippingPrice.onChange}
                value={String(maximumShippingPrice.value)}
                positiveOnly
              />
            </div>
            {maximumShippingPrice?.error && (
              <InlineError
                fieldID={EXCLUDE_SHIPPING_RATES_FIELD_ID}
                message={maximumShippingPrice.error}
              />
            )}
          </>
        )}
      </Card.Section>
    </Card>
  );
}
