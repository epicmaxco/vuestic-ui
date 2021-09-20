pwd=`pwd`

cd ../ui
echo "Building vuestic-ui"
yarn build &> /dev/null
cd $pwd