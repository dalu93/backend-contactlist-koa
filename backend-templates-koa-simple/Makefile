bin := node_modules/.bin/

now = `date -u +"%Y-%m-%dT%H:%M:%SZ"`
log = echo "$(now) $(1)"

# By default, make will run in silent mode
ifndef VERBOSE
.SILENT:
endif

all: compile

copy:
	$(call log,"Copying files ...")
	mkdir -p ./dist
	cp ./package.json ./dist/package.json
	$(call log,"Files copied.")

compile: install copy
	$(call log,"Compiling ...")
	$(bin)babel src -q --source-maps both --out-dir ./dist/src
	$(bin)babel tests -q --source-maps both --out-dir ./dist/tests
	$(call log,"Compiled.")

# In layman's terms: node_modules directory depends on the state of package.json
# Make will compare their timestamps and only if package.json is newer, it will run this target.
node_modules: package.json
	$(call log,"Installing dependencies ...")
	npm install
	$(call log,"Dependencies installed.")

install: node_modules

infra:
	$(call log,"Starting services ...")
	docker-compose up -d
	$(call log,"Services started.")

stop-infra:
	$(call log,"Stopping services ...")
	docker-compose stop
	$(call log,"Services stopped.")

restart-infra: stop-infra infra

lint:
	$(call log,"Running ESLint ...")
	$(bin)eslint --ext .js ./src ./tests
	$(call log,"ESLint run completed.")

test: compile
	$(call log,"Running tests ...")
	NODE_ENV=test $(bin)mocha --opts ./tests/mocha.opts ./dist/tests
	$(call log,"Tests completed.")

coverage: compile
	$(call log,"Generating coverage ...")
	NODE_ENV=test $(bin)nyc $(bin)mocha --opts ./tests/mocha.opts ./dist/tests
	$(call log,"Coverage report generated.")

security-test:
	$(call log,"Running security test ...")
	$(bin)snyk test
	$(call log,"Security test completed.")

clean:
	$(call log,"Cleaning ...")
	rm -rf ./.nyc_output
	rm -rf ./coverage
	rm -rf ./dist
	$(call log,"Clean done.")

.PHONY: compile
	lint
	test
	clean
	infra
	stop-infra
	restart-infra
	run
