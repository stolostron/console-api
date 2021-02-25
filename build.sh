#!/bin/bash
###############################################################################
# (c) Copyright IBM Corporation 2019, 2020. All Rights Reserved.
# Note to U.S. Government Users Restricted Rights:
# U.S. Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule
# Contract with IBM Corp.
# Licensed Materials - Property of IBM
###############################################################################
# Copyright (c) 2020 Red Hat, Inc.
set -e

export DOCKER_IMAGE_AND_TAG=${1}
make image
