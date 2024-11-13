import { Button } from '@components/Button';
import { Heading } from '@components/Heading';
import { Text } from '@components/Text';
import './VacancyList.css';

export const VacancyList = () => {
  return (
    <ul className="vacancy-list">
      <li className="vacancy-list__item">
        <Heading displayLevel={4} level="span">
          Digital Product Designer
        </Heading>
        <Text as="span" variant="subtext">
          Eng & NL
        </Text>
        <Text as="span" variant="subtext">
          Valsplat
        </Text>
        <Text as="span" variant="subtext">
          32-40 uur
        </Text>
        <Text as="span" variant="subtext">
          Nieuwersluis
        </Text>
        <Button
          as="a"
          height="narrow"
          icon="external"
          level="secondary"
          variant="large"
        >
          Bekijken
        </Button>
      </li>
      <li className="vacancy-list__item">
        <Heading displayLevel={4} level="span">
          Digital Product Designer
        </Heading>
        <Text as="span" variant="subtext">
          Eng & NL
        </Text>
        <Text as="span" variant="subtext">
          Valsplat
        </Text>
        <Text as="span" variant="subtext">
          32-40 uur
        </Text>
        <Text as="span" variant="subtext">
          Nieuwersluis
        </Text>
        <Button
          as="a"
          height="narrow"
          icon="external"
          level="secondary"
          variant="large"
        >
          Bekijken
        </Button>
      </li>
      <li className="vacancy-list__item">
        <Heading displayLevel={4} level="span">
          Digital Product Designer en meer en wat dan
        </Heading>
        <Text as="span" variant="subtext">
          NL
        </Text>
        <Text as="span" variant="subtext">
          Valsplat
        </Text>
        <Text as="span" variant="subtext">
          32-40 uur
        </Text>
        <Text as="span" variant="subtext">
          Nieuwersluis
        </Text>
        <Button
          as="a"
          height="narrow"
          icon="external"
          level="secondary"
          variant="large"
        >
          Bekijken
        </Button>
      </li>
    </ul>
  );
};
