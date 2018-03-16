sh release.sh
scp build/deploy/static-lufax-public.zip wls81opr@172.17.40.42:/nfsc/upload/ies_p2p_share/static/
ssh wls81opr@172.17.40.42 "unzip -o /nfsc/upload/ies_p2p_share/static/static-lufax-public.zip -d /nfsc/upload/ies_p2p_share/static/"

# template #
scp build/deploy/lufax-public-template.zip wls81opr@172.17.40.42:/nfsc/upload/ies_p2p_share/common/lufax-public/
ssh wls81opr@172.17.40.42 "unzip -o /nfsc/upload/ies_p2p_share/common/lufax-public/lufax-public-template.zip -d /nfsc/upload/ies_p2p_share/common/lufax-public/"
# template #

# template #
scp build/deploy/lufax-public-template-lu.zip wls81opr@172.17.40.42:/nfsc/upload/ies_p2p_share/common2/lufax-public/
ssh wls81opr@172.17.40.42 "unzip -o /nfsc/upload/ies_p2p_share/common2/lufax-public/lufax-public-template-lu.zip -d /nfsc/upload/ies_p2p_share/common2/lufax-public/"
# template #