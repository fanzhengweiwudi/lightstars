Name: lightstar
Version: 0.1.1
Release: 1%{?dist}
Summary: LightStar's Project Software
Group: Applications/Communications
License: GPL 3.0
URL: https://github.com/danieldin95/lightstar
BuildRequires: go
Requires: libvirt-daemon

%define _source_dir ${RPM_SOURCE_DIR}/lightstar-%{version}

%description
LightStar's Project Software

%build
cd %_source_dir && make

%install
mkdir -p %{buildroot}/usr/bin
cp %_source_dir/lightstar %{buildroot}/usr/bin/lightstar

mkdir -p %{buildroot}/etc/sysconfig
cat > %{buildroot}/etc/sysconfig/lightstar.cfg << EOF
OPTIONS="-static:dir /var/lightstar/static -crt:dir /var/lightstar/ca -auth:file /etc/lightstar.auth"
EOF

mkdir -p %{buildroot}/usr/lib/systemd/system
cp %_source_dir/resource/lightstar.service %{buildroot}/usr/lib/systemd/system

mkdir -p %{buildroot}/var/lightstar
cp -R %_source_dir/resource/ca %{buildroot}/var/lightstar
cp -R %_source_dir/http/static %{buildroot}/var/lightstar


%pre
firewall-cmd --permanent --zone=public --add-port=10080/tcp --permanent || {
  echo "You need allowed TCP port 10080 manually."
}
firewall-cmd --reload || :

%files
%defattr(-,root,root)
/etc/*
/usr/bin/*
/usr/lib/systemd/system/*
/var/lightstar
