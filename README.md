<h1 align="center">Foo Medical</h1>
<p align="center">A free and open-source healthcare webapp from the Medplum team.</p>
<p align="center">
  <a href="https://github.com/medplum/foomedical/actions">
    <img src="https://github.com/medplum/foomedical/actions/workflows/build.yml/badge.svg" />
  </a>
  <a href="https://sonarcloud.io/project/overview?id=medplum_foomedical">
    <img src="https://sonarcloud.io/api/project_badges/measure?project=medplum_foomedical&metric=alert_status&token=3760929adde88ce7da87782be8d811f8b5cec0f4" />
  </a>
</p>

![Foo Medical Screenshot](screenshot.png)

### Features

* Completely free and open-source
* Secure and compliant [Medplum](https://www.medplum.com) backend
* Patient registration and authentication
* Health records
  * Lab results
  * Medications
  * Vaccines
  * Vitals
* Patient-provider messaging
* Care plans
* Patient scheduling
* All data represented with [FHIR](https://hl7.org/FHIR/)

Foo Medical is designed to be forked and customized for your business's needs.

### Data Setup

When you log into Foo Medical a set of sample FHIR records is created on your behalf.  The ability to run automations is part of the Medplum platform using a framework called [Bots](https://docs.medplum.com/app/bots).  The Bot that created the records in Foo Medical can be found [here](https://github.com/medplum/medplum-demo-bots/blob/main/src/examples/sample-account-setup.ts).

### About Medplum

Medplum is an open-source, API-first EHR. Medplum makes it easy to build healthcare apps quickly with less code.
