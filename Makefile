###############################################################################
# Licensed Materials - Property of IBM Copyright IBM Corporation 2017, 2019. All Rights Reserved.
# U.S. Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP
# Schedule Contract with IBM Corp.
#
# Contributors:
#  IBM Corporation - initial API and implementation
###############################################################################

include Configfile

# Bootstrap (pull) the build harness

# GITHUB_USER containing '@' char must be escaped with '%40'
GITHUB_USER := $(shell echo $(GITHUB_USER) | sed 's/@/%40/g')
GITHUB_TOKEN ?=

ifdef GITHUB_TOKEN
-include $(shell curl -H 'Authorization: token ${GITHUB_TOKEN}' -H 'Accept: application/vnd.github.v4.raw' -L https://api.github.com/repos/open-cluster-management/build-harness-extensions/contents/templates/Makefile.build-harness-bootstrap -o .build-harness-bootstrap; echo .build-harness-bootstrap)
endif

DOCKER_BUILD_OPTS = --build-arg "VCS_REF=$(VCS_REF)" \
										--build-arg "VCS_URL=$(GIT_REMOTE_URL)" \
										--build-arg "IMAGE_NAME=$(IMAGE_NAME)" \
										--build-arg "IMAGE_DESCRIPTION=$(IMAGE_DESCRIPTION)" \
										--build-arg "IMAGE_DISPLAY_NAME=$(IMAGE_DISPLAY_NAME)" \
										--build-arg "IMAGE_NAME_ARCH=$(IMAGE_NAME_ARCH)" \
										--build-arg "IMAGE_MAINTAINER=$(IMAGE_MAINTAINER)" \
										--build-arg "IMAGE_VENDOR=$(IMAGE_VENDOR)" \
										--build-arg "IMAGE_VERSION=$(IMAGE_VERSION)" \
										--build-arg "IMAGE_DESCRIPTION=$(IMAGE_DESCRIPTION)" \
										--build-arg "IMAGE_SUMMARY=$(IMAGE_SUMMARY)" \
										--build-arg "IMAGE_OPENSHIFT_TAGS=$(IMAGE_OPENSHIFT_TAGS)"

SHORT_COMMIT_NAME := $(shell git rev-parse --short HEAD)

ifneq ($(ARCH), x86_64)
DOCKER_FILE = Dockerfile.$(ARCH)
else
DOCKER_FILE = Dockerfile
endif
@echo "using DOCKER_FILE: $(DOCKER_FILE)"


.PHONY: copyright-check
copyright-check:
	./copyright-check.sh $(TRAVIS_BRANCH)

lint:
	npm run lint

install:
	npm ci

prune:
	npm prune --production

.PHONY: build
build:
	npm run build:production

.PHONY: run
run: check-env app-version
	docker run \
	-e NODE_ENV=development \
	-d -p $(HOST):$(APP_PORT):$(CONTAINER_PORT) $(IMAGE_REPO)/$(IMAGE_NAME_ARCH):$(IMAGE_VERSION)

push: check-env app-version

.PHONY: test
test:
ifeq ($(UNIT_TESTS), TRUE)
	if [ ! -d "test-output" ]; then \
		mkdir test-output; \
	fi
	npm test
endif

.PHONY: image
image: build lint prune
	make docker/info
	make docker/build

.PHONY: app-version
app-version:
	$(eval WORKING_CHANGES := $(shell git status --porcelain))
	$(eval BUILD_DATE := $(shell date +%m/%d@%H:%M:%S))
	$(eval GIT_COMMIT := $(shell git rev-parse --short HEAD))
	$(eval VCS_REF := $(if $(WORKING_CHANGES),$(GIT_COMMIT)-$(BUILD_DATE),$(GIT_COMMIT)))
	$(eval APP_VERSION ?= $(if $(shell cat VERSION 2> /dev/null),$(shell cat VERSION 2> /dev/null),0.0.1))
	$(eval IMAGE_VERSION ?= $(APP_VERSION)-$(GIT_COMMIT))
	@echo "App: $(IMAGE_NAME_ARCH) $(IMAGE_VERSION)"

.PHONY: check-env
check-env:
ifndef IMAGE_REPO
	$(error IMAGE_REPO is undefined)
endif
ifndef IMAGE_NAME
	$(error IMAGE_NAME is undefined)
endif
ifneq ($(ARCH), x86_64)
	$(eval DOCKER_FLAG = -f Dockerfile.$(ARCH))
endif
.PHONY: test-image-size
test-image-size:: check-env app-version
	@echo "Testing image size: $(IMAGE_REPO)/$(IMAGE_NAME_ARCH):$(IMAGE_VERSION)"
	$(eval IMAGE_SIZE= $(shell docker inspect --format='{{.Size}}' $(IMAGE_REPO)/$(IMAGE_NAME_ARCH):$(IMAGE_VERSION) ) )
	@echo "Image Size: $(IMAGE_SIZE)"
	@if [ $(IMAGE_SIZE) -gt $(MAX_IMAGE_SIZE) ]; then \
		echo ERROR: image size greater than $(MAX_IMAGE_SIZE); \
		exit 2; \
	fi

.PHONY: show-labels
show-labels: app-version
	@docker inspect $(IMAGE_REPO)/$(IMAGE_NAME_ARCH):$(IMAGE_VERSION) --format='{{json .Config.Labels}}' | tr , '\n' | tr -d '{' | tr -d '}'

.PHONY:
image-dev: build
	docker build -t $(IMAGE_NAME_ARCH):latest .

.PHONY: multi-arch
multi-arch:
	make docker:manifest-tool
	make docker:multi-arch DOCKER_TAG=$(RELEASE_TAG)
	make docker:multi-arch DOCKER_TAG=$(SEMVERSION)
