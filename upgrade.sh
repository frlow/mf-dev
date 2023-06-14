reference="@mf-dev/wrapper-common"
current=$(pnpm pkg get version | sed -r 's/\"//g')
remote=$(pnpm show $reference --version)
if [ "$current" != "$remote" ];
then
  echo "new version, publishing $current"
  pnpm -r --filter="@mf-dev/*" exec pnpm version --no-git-tag-version $current
  pnpm -r publish --dry-run --no-git-checks
else
  echo "same version"
fi