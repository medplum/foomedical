import { Anchor, Container, Divider, SimpleGrid, Stack, Text } from '@mantine/core';
import classes from './Footer.module.css';

export function Footer(): JSX.Element {
  return (
    <footer className={classes.footer}>
      <div className={classes.inner}>
        <Container p="xl">
          <Stack gap="xl">
            <SimpleGrid cols={4}>
              <Anchor href="https://app.healthpass.plus">For practicioners</Anchor>
            </SimpleGrid>
            <Divider />
            <Text c="dimmed" size="sm">
              &copy; {new Date().getFullYear()} healthpass.plus by medworx.io All rights reserved.
            </Text>
          </Stack>
        </Container>
      </div>
    </footer>
  );
}
