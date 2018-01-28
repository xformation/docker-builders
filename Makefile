PREFIX=xformation_
DOCKERC = docker build -t $(PREFIX)$@ $@

all: jenkin jira confluence nexus archiva sinopia sonar crucible

jenkin: FORCE
	$(DOCKERC)

jira: FORCE
	$(DOCKERC)

confluence: FORCE
	$(DOCKERC)

nexus: FORCE
	$(DOCKERC)

archiva: FORCE
	$(DOCKERC)

sinopia: FORCE
	$(DOCKERC)

sonar: FORCE
	$(DOCKERC)

crucible: FORCE
	$(DOCKERC)
	
FORCE:

