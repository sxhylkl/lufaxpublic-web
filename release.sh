zipFile="static-lufax-public.zip"

if ! [ -d "build/deploy" ] ; then
	mkdir -p build/deploy
fi

cp -r static-lufax-public lufax-public
zip -r $zipFile lufax-public/*
mv  $zipFile build/deploy/
rm -rf lufax-public


# template #
tempFolder="lufax-public-template"

if ! [ -d $tempFolder"/template" ] ; then
	mkdir -p $tempFolder/template
fi

cp -r wam/build/* $tempFolder/template

cp -r $tempFolder/template template
zip -r $tempFolder.zip template/*
mv $tempFolder.zip build/deploy/
rm -rf template
rm -rf wam/build/*
# template #

# template #
tempFolder2="lufax-public-template-lu"
cp -r $tempFolder2/template template

zip -r $tempFolder2.zip template/*
mv $tempFolder2.zip build/deploy/

rm -rf template
# template #