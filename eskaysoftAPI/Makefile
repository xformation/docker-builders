all: run

# This makefile contains some convenience commands for deploying and publishing.

# For example, to build and run the docker container locally, just run:
# $ make

# or to publish the :latest version to the specified registry as :1.0.0, run:
# $ make publish version=1.0.0

# name = examples/crossoverservice
# registry = 657907747545.dkr.ecr.us-east-1.amazonaws.com
# version ?= latest

binary:
	$(call blue, "Building Java Jar binary ready for containerisation...")
	echo "${mvnHome}"
	${mvnHome}/bin/mvn clean package -DskipTests=true

test:
	$(call blue, "Building Java Jar binary ready for containerisation...")
	echo "${mvnHome}"
	${mvnHome}/bin/mvn surefire-report:report

image: binary
	$(call blue, "Building docker image...")
	docker build -t ${IMAGE_NAME}:${VERSION} .
	$(MAKE) clean

run: image
	$(call blue, "Running Docker image locally...")
	docker run -i -t --rm -p 8001:8001 ${IMAGE_NAME}:${VERSION} 

publish:  
	$(call blue, "Publishing Docker image to registry...")
	docker tag ${IMAGE_NAME}:latest ${REGISTRY}/${IMAGE_NAME}:${VERSION}
	docker push ${REGISTRY}/${IMAGE_NAME}:${VERSION}

clean: 
	@rm -f app 

define blue
	@echo $1
endef
