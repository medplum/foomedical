// SPDX-FileCopyrightText: Copyright Orangebot, Inc. and Medplum contributors
// SPDX-License-Identifier: Apache-2.0
import {
  Anchor,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Group,
  Image,
  Overlay,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { formatHumanName } from '@medplum/core';
import { Patient, Practitioner } from '@medplum/fhirtypes';
import { useMedplumProfile } from '@medplum/react';
import { IconChecklist, IconGift, IconSquareCheck } from '@tabler/icons-react';
import { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import DoctorImage from '../img/homePage/doctor.svg';
import HealthRecordImage from '../img/homePage/health-record.svg';
import HealthVisitImage from '../img/homePage/health-visit.jpg';
import PharmacyImage from '../img/homePage/pharmacy.svg';
import PillImage from '../img/homePage/pill.svg';
import classes from './HomePage.module.css';

export function HomePage(): JSX.Element {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const profile = useMedplumProfile() as Patient | Practitioner;
  const profileName = profile.name ? formatHumanName(profile.name[0]) : '';

  const linkPages = [
    {
      img: HealthRecordImage,
      title: t('home.linkpages.healthrecord.title'),
      description: '',
      href: '/health-record',
    },
    {
      img: PillImage,
      title: t('home.linkpages.prescription.title'),
      description: '',
      href: '/health-record/medications',
    },
    {
      img: PharmacyImage,
      title: t('home.linkpages.pharmacy.title'),
      description: t('home.linkpages.pharmacy.description'),
      href: '#',
    },
  ];
  const recommendations = [
    {
      title: t('home.recommendations.travel.title'),
      description: t('home.recommendations.travel.description'),
    },
    {
      title: t('home.recommendations.reimbursement.title'),
      description: t('home.recommendations.reimbursement.description'),
    },
    {
      title: t('home.recommendations.records.title'),
      description: t('home.recommendations.records.description'),
    },
  ];

  const carouselItems = [
    {
      img: <IconChecklist />,
      title: t('home.carousel.welcome.title'),
      description: t('home.carousel.welcome.description'),
      url: '/screening-questionnaire',
      label: t('home.carousel.welcome.label'),
    },
    {
      img: <IconChecklist />,
      title: t('home.carousel.intake.title'),
      description: t('home.carousel.intake.description'),
      url: '/patient-intake-questionnaire',
      label: t('home.carousel.intake.label'),
    },
    {
      img: <IconChecklist />,
      title: t('home.carousel.doctor.title'),
      description: t('home.carousel.doctor.description'),
      url: '/account/provider/choose-a-primary-care-povider',
      label: t('home.carousel.doctor.label'),
    },
    {
      img: <IconChecklist />,
      title: t('home.carousel.contact.title'),
      description: t('home.carousel.contact.description'),
      url: '/account',
      label: t('home.carousel.contact.label'),
    },
  ];

  return (
    <Box bg="gray.0">
      <Box className={classes.announcements}>
        <span>
          {t('home.announcements')} <Anchor href="#">{t('home.announcements.links')}</Anchor>
        </span>
      </Box>
      <div className={classes.hero}>
        <Overlay
          gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.4) 40%)"
          opacity={1}
          zIndex={0}
        />
        <Container className={classes.heroContainer}>
          <Title className={classes.heroTitle}>
            {t('home.hero.title', { profileName })}
          </Title>
          <Button size="xl" radius="xl" className={classes.heroButton}>
            {t('home.hero.button')}
          </Button>
        </Container>
      </div>
      <Box className={classes.callToAction}>
        <Group justify="center">
          <IconGift />
          <p>{t('home.calltoaction')}</p>
          <Button variant="white" onClick={() => navigate('/messages')?.catch(console.error)}>
            {t('home.calltoaction.button')}
          </Button>
        </Group>
      </Box>
      <Box p="lg">
        <Container>
          <Grid>
            {carouselItems.map((item, index) => (
              <Grid.Col key={`card-${index}`} span={3} pb={40}>
                <Card shadow="md" radius="md" className={classes.card} p="xl">
                  <IconSquareCheck />
                  <Text size="lg" fw={500} mt="md">
                    {item.title}
                  </Text>
                  <Text size="sm" color="dimmed" my="sm">
                    {item.description}
                  </Text>
                  <Anchor href={item.url}>{item.label}</Anchor>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </Box>
      <Box p="lg">
        <Container>
          <Card shadow="md" radius="md" className={classes.card} p="xl">
            <IconSquareCheck />
            <Text size="lg" fw={500} mt="md">
              {t('home.card.rest.title')}
            </Text>
            <Text size="sm" color="dimmed" my="sm">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste
              dolor cupiditate blanditiis ratione. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores
              impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
            </Text>
            <Group>
              <Button>{t('home.card.rest.button')}</Button>
            </Group>
          </Card>
        </Container>
      </Box>
      <Box p="lg">
        <Container>
          <Card shadow="md" radius="md" className={classes.card} p="xl">
            <Flex>
              <Image src={HealthVisitImage} m="-40px 30px -40px -40px" w="40%" />
              <div>
                <Badge color={theme.primaryColor} size="xl">
                  {t('home.card.available.badge')}
                </Badge>
                <Text size="lg" fw={500} mt="md">
                  {t('home.card.available.title')}
                </Text>
                <Text size="sm" color="dimmed" my="sm">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque,
                  iste dolor cupiditate blanditiis ratione. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
                </Text>
              </div>
            </Flex>
          </Card>
        </Container>
      </Box>
      <Box p="lg">
        <Container>
          <Grid columns={3} pb="xl">
            {linkPages.map((item, index) => (
              <Grid.Col key={`card-${index}`} span={1}>
                <Card shadow="md" radius="md" className={classes.card} p="xl">
                  <Image src={item.img} w={80} />
                  <Text size="lg" fw={500} mt="md">
                    {item.title}
                  </Text>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </Box>
      <Box p="lg">
        <Container>
          <Grid columns={2} pb="xl">
            <Grid.Col span={1}>
              <Card shadow="md" radius="md" className={classes.card} p="xl">
                <Group wrap="nowrap">
                  <Avatar src={DoctorImage} size="xl" />
                  <div>
                    <Text fw={500}>{t('home.card.provider.title')}</Text>
                    <Text size="sm" color="dimmed" my="sm">
                      {t('home.card.provider.description')}
                    </Text>
                    <Button onClick={() => navigate('/account/provider')?.catch(console.error)}>{t('home.card.provider.button')}</Button>
                  </div>
                </Group>
              </Card>
            </Grid.Col>
            <Grid.Col span={1}>
              <Card shadow="md" radius="md" className={classes.card} p="xl">
                <Stack>
                  {recommendations.map((item, index) => (
                    <div key={`recommendation-${index}`}>
                      <Text fw={500}>{item.title}</Text>
                      <Text size="sm" color="dimmed" my="sm">
                        {item.description}
                      </Text>
                    </div>
                  ))}
                </Stack>
              </Card>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
