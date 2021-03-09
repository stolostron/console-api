# Copyright (c) 2020 Red Hat, Inc.
# Copyright Contributors to the Open Cluster Management project

if ! jq --version > /dev/null 2>&1; then
  echo "Missing dependency: jq"
  return
elif ! oc version> /dev/null 2>&1; then
  echo "Missing dependency: oc"
  return
fi

OCM_NAMESPACE=open-cluster-management
OCM_ROUTE=multicloud-console
OCM_ADDRESS=https://`oc -n $OCM_NAMESPACE get route $OCM_ROUTE -o json | jq -r '.spec.host'`

SERVICEACCT_TOKEN=$(oc whoami -t)
API_SERVER_URL=$(oc whoami --show-server)

echo
echo "Testing..."
echo '"env": {'
for variable in SERVICEACCT_TOKEN API_SERVER_URL
do
  export $variable
  eval printf '"  \"%s\": \"%s\",\\n"' "$variable" "\${$variable?}"
done
echo '}'
