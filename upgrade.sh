reference="@mf-dev/wrapper-common"
current=$(pnpm pkg get version | sed -r 's/\"//g')
remote=$(pnpm show $reference --version)
if [ "$current" != "$remote" ];
then
  npm config -L project set '//registry.npmjs.org/:_authToken' $1
  echo "new version, publishing $current"
  pnpm -r --filter="@mf-dev/*" exec pnpm version --no-git-tag-version $current
  pnpm i
  pnpm -r publish --no-git-checks --access public
  pnpm -r --filter="@mf-dev/*" exec pnpm version --no-git-tag-version 0.0.0
  pnpm i
  rm .npmrc
else
  echo "same version"
fi