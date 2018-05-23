#!/bin/bash
set -o errexit
/opt/confluence/setup-confluence-db.sh
cat <<END > /opt/confluence-home/confluence.cfg.xml
<?xml version="1.0" encoding="UTF-8"?>
<confluence-configuration>
  <setupStep>complete</setupStep>
  <setupType>custom</setupType>
  <buildNumber>5984</buildNumber>
  <properties>
    <property name="atlassian.license.message">AAABNA0ODAoPeNp1kEtPwzAQhO/+FZa4wMFV4kJfkiUgiVClJIU+gAMX42xbQ+JWa6ci/x634VEQH CxZ3pnxt3PyAAXNZEN5lwZ8FPRG3SGN4jnlQTggMViFeuv0xohoY5ZlDUYBPZ0B7gDPnkY02cmyl nsBiRAOl1g6EHs7Cy4Y7xJvdFK5XFYgCpQvYNcIRaEvV5XUZUdtKqJ8dsdr9A6Ewxrah5mT6ADFU pYWPmOSzJv+y/mmOYpJtQJjYd5s4cAQTbIsmUbjq5SU7ege0O49nPhw48BIv2XyttXYHC3TY5yTC a6k0bb9wzYGPPSrJW0h41hcT+cRu8tvUjbMFyFbPPoWZ0ku/GFpGPbPB8N+SD6QvD4dxz9HB+S8r p4BJ8uF9WSCfRn+ZrqtUa2lhd/FvwMquZy2MC0CFA7ikm2aEpxsomSjxw0iqPUxlBY6AhUAgeMW0 TX+kG8x5gulOF+qoBQ2Atk=X02ff</property>
    <property name="attachments.dir">${confluenceHome}/attachments</property>
    <property name="confluence.democontent.installed">true</property>
    <property name="confluence.setup.server.id">BRTC-QNGL-9NU1-UX18</property>
    <property name="confluence.webapp.context.path"></property>
    <property name="hibernate.c3p0.acquire_increment">1</property>
    <property name="hibernate.c3p0.idle_test_period">100</property>
    <property name="hibernate.c3p0.max_size">30</property>
    <property name="hibernate.c3p0.max_statements">0</property>
    <property name="hibernate.c3p0.min_size">0</property>
    <property name="hibernate.c3p0.timeout">30</property>
    <property name="hibernate.connection.driver_class">org.postgresql.Driver</property>
    <property name="hibernate.connection.isolation">2</property>
    <property name="hibernate.connection.password">${DB_PASSWORD}</property>
    <property name="hibernate.connection.url">${DB_JDBC_URL}/confluence</property>
    <property name="hibernate.connection.username">${DB_USER}</property>
    <property name="hibernate.database.lower_non_ascii_supported">false</property>
    <property name="hibernate.dialect">net.sf.hibernate.dialect.PostgreSQLDialect</property>
    <property name="hibernate.setup">true</property>
    <property name="lucene.index.dir">${localHome}/index</property>
    <property name="setup.hasSelectedBundle">true</property>
    <property name="setup.selectedBundlePluginKeys">{"com.atlassian.confluence.extra.team-calendars":{"key":"com.atlassian.confluence.extra.team-calendars","namespace":"team_calendars","name":"Team Calendars","description":"setup.selectbundle.team-calendars","license":"AAABMA0ODAoPeNp1kMtOwzAQRff+CktsYJEqcemDSpZAaRZITYtogQ0SGpxJa0icaOxU5O9x+hAog\r\noU3tu+5c+biBTOeQsvFkIdiFo5nI8Hj+YaLMJqyOVpFuna6MnKDUPIYCjQZkOV5RTyuTF40aBTyy\r\nzXSHunqdcaTPRQNdBm2bMp3pFX+ZJGsDCLmPORNnSEDNA6pJm1ROmqQxYSH4Bwcym6CIBwFYsh8k\r\nQPlllCizAg+0O4Is0zfbkvQxUBVZZ/sf+v9idp7WjsgXytzKCye0UnqQf+xf4yOwEIrNBafvVR3J\r\n5gPexMDfhPJV62p/SUwDoToj7A4AjZtjQeneJWmyWN8f7dgK9qC0fbYZluDXuTTsnWylP4EiyiaX\r\nE9vJiN2Yvzd99CQ2oHF/iK/AUtGqiUwLQIVAIAXvPbog8JawBq+LVQjH9MunkL5AhQHexlB591u9\r\ntmrSW8lPEVhOCWKjA==X02fb\r\n","remoteUrl":"https://marketplace.atlassian.com/download/plugins/com.atlassian.confluence.extra.team-calendars","localUrl":"file:/opt/confluence/confluence/WEB-INF/others/team-calendars-5.2.13.obr","logo":"tc-logo.png","label":"license.tc.key","generateLicenseLink":"license.tc.generate.link"},"com.atlassian.confluence.plugins.confluence-questions":{"key":"com.atlassian.confluence.plugins.confluence-questions","namespace":"com.atlassian.confluence.plugins.confluence-questions","name":"Confluence Questions","description":"setup.selectbundle.confluence-questions","license":"AAABQQ0ODAoPeNqtkstOwzAQRff+CktsYJEocXmUSpFAaRZITQu0wIbNkExaQ+KEGacif4/Th6iQ2\r\nFQsRrJm7HuPr33ygrlMoZNqIAM1Cq5GAyXj8UKqIByKMXJGurG6NtFDi9wvWBY1ybg2RdmiyVCez\r\npHWSGevI5msoWyh3yWmbfWGNCueGIkjLxQx4WYyBotRr+4FF54aCKdkIbNTqDDKCd6RV4R5rm+WF\r\nejSz+pKuPLBlsCswbjO3tpvynapDR+0vM89pu9E9RojSy0eqTC3QBYpKqBk3IMmqcP6i/QngK1vq\r\nTM0jM8ug76nhDtsLBpwRslXo6k7iOPSU+pI0snWZ9E1uAkynqVp8hjf3U7EjJZgNG+huDPoYvlgM\r\nU+mkStvEoZX58PrYSB2Gv+Jhe6u1JDm3TPct5StgPH3H/gGosjmPzAsAhR2c8CJ5t0MenjRY7IZ+\r\nT8fCnWeJQIUArvNyzIpW5ptaJVmRsd91oqJK5E=X02g0\r\n ","remoteUrl":"https://marketplace.atlassian.com/download/plugins/com.atlassian.confluence.plugins.confluence-questions","localUrl":"file:/opt/confluence/confluence/WEB-INF/others/confluence-questions-2.1.1.obr","logo":"cq-logo.png","label":"license.cq.key","generateLicenseLink":"license.cq.generate.link"}}</property>
    <property name="webwork.multipart.saveDir">${localHome}/temp</property>
  </properties>
</confluence-configuration>
END
/opt/confluence/bin/catalina.sh run