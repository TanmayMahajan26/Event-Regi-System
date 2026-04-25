$env:FILTER_BRANCH_SQUELCH_WARNING="1"
git filter-branch -f --env-filter '
    if test "$GIT_AUTHOR_EMAIL" = "thesrush99@gmail.com"
    then
        GIT_AUTHOR_NAME="TanmayMahajan26"
        GIT_AUTHOR_EMAIL="dhanashreeclinic@gmail.com"
    fi
    if test "$GIT_COMMITTER_EMAIL" = "thesrush99@gmail.com"
    then
        GIT_COMMITTER_NAME="TanmayMahajan26"
        GIT_COMMITTER_EMAIL="dhanashreeclinic@gmail.com"
    fi
    export GIT_AUTHOR_NAME
    export GIT_AUTHOR_EMAIL
    export GIT_COMMITTER_NAME
    export GIT_COMMITTER_EMAIL
' --tag-name-filter cat -- --branches --tags
