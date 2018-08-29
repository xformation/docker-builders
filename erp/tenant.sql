--
-- PostgreSQL database dump
--

-- Dumped from database version 10.4
-- Dumped by pg_dump version 10.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: component; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.component (
    component_name character varying(100) NOT NULL,
    root_location character varying(255),
    last_updated_stamp timestamp with time zone,
    last_updated_tx_stamp timestamp with time zone,
    created_stamp timestamp with time zone,
    created_tx_stamp timestamp with time zone
);


ALTER TABLE public.component OWNER TO postgres;

--
-- Name: tenant; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tenant (
    tenant_id character varying(20) NOT NULL,
    tenant_name character varying(100),
    initial_path character varying(255),
    disabled character(1),
    last_updated_stamp timestamp with time zone,
    last_updated_tx_stamp timestamp with time zone,
    created_stamp timestamp with time zone,
    created_tx_stamp timestamp with time zone
);


ALTER TABLE public.tenant OWNER TO postgres;

--
-- Name: tenant_component; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tenant_component (
    tenant_id character varying(20) NOT NULL,
    component_name character varying(100) NOT NULL,
    sequence_num numeric(20,0),
    last_updated_stamp timestamp with time zone,
    last_updated_tx_stamp timestamp with time zone,
    created_stamp timestamp with time zone,
    created_tx_stamp timestamp with time zone
);


ALTER TABLE public.tenant_component OWNER TO postgres;

--
-- Name: tenant_data_source; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tenant_data_source (
    tenant_id character varying(20) NOT NULL,
    entity_group_name character varying(100) NOT NULL,
    jdbc_uri character varying(255),
    jdbc_username character varying(255),
    jdbc_password character varying(255),
    last_updated_stamp timestamp with time zone,
    last_updated_tx_stamp timestamp with time zone,
    created_stamp timestamp with time zone,
    created_tx_stamp timestamp with time zone
);


ALTER TABLE public.tenant_data_source OWNER TO postgres;

--
-- Name: tenant_domain_name; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tenant_domain_name (
    tenant_id character varying(20),
    domain_name character varying(255) NOT NULL,
    last_updated_stamp timestamp with time zone,
    last_updated_tx_stamp timestamp with time zone,
    created_stamp timestamp with time zone,
    created_tx_stamp timestamp with time zone
);


ALTER TABLE public.tenant_domain_name OWNER TO postgres;

--
-- Name: tenant_key_encrypting_key; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tenant_key_encrypting_key (
    tenant_id character varying(20) NOT NULL,
    kek_text character varying(255),
    last_updated_stamp timestamp with time zone,
    last_updated_tx_stamp timestamp with time zone,
    created_stamp timestamp with time zone,
    created_tx_stamp timestamp with time zone
);


ALTER TABLE public.tenant_key_encrypting_key OWNER TO postgres;

--
-- Data for Name: component; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.component (component_name, root_location, last_updated_stamp, last_updated_tx_stamp, created_stamp, created_tx_stamp) FROM stdin;
base	C:/mycode/scipio-erp/framework/base/	2018-08-27 16:00:18.521+05:30	2018-08-27 16:00:18.521+05:30	2018-08-25 14:53:40.403+05:30	2018-08-25 14:53:40.403+05:30
geronimo	C:/mycode/scipio-erp/framework/geronimo/	2018-08-27 16:00:18.531+05:30	2018-08-27 16:00:18.531+05:30	2018-08-25 14:53:40.414+05:30	2018-08-25 14:53:40.413+05:30
entity	C:/mycode/scipio-erp/framework/entity/	2018-08-27 16:00:18.535+05:30	2018-08-27 16:00:18.535+05:30	2018-08-25 14:53:40.417+05:30	2018-08-25 14:53:40.417+05:30
security	C:/mycode/scipio-erp/framework/security/	2018-08-27 16:00:18.539+05:30	2018-08-27 16:00:18.539+05:30	2018-08-25 14:53:40.42+05:30	2018-08-25 14:53:40.42+05:30
datafile	C:/mycode/scipio-erp/framework/datafile/	2018-08-27 16:00:18.543+05:30	2018-08-27 16:00:18.542+05:30	2018-08-25 14:53:40.423+05:30	2018-08-25 14:53:40.423+05:30
minilang	C:/mycode/scipio-erp/framework/minilang/	2018-08-27 16:00:18.55+05:30	2018-08-27 16:00:18.55+05:30	2018-08-25 14:53:40.427+05:30	2018-08-25 14:53:40.427+05:30
common	C:/mycode/scipio-erp/framework/common/	2018-08-27 16:00:18.555+05:30	2018-08-27 16:00:18.555+05:30	2018-08-25 14:53:40.431+05:30	2018-08-25 14:53:40.43+05:30
service	C:/mycode/scipio-erp/framework/service/	2018-08-27 16:00:18.559+05:30	2018-08-27 16:00:18.559+05:30	2018-08-25 14:53:40.433+05:30	2018-08-25 14:53:40.433+05:30
catalina	C:/mycode/scipio-erp/framework/catalina/	2018-08-27 16:00:18.562+05:30	2018-08-27 16:00:18.562+05:30	2018-08-25 14:53:40.436+05:30	2018-08-25 14:53:40.436+05:30
entityext	C:/mycode/scipio-erp/framework/entityext/	2018-08-27 16:00:18.566+05:30	2018-08-27 16:00:18.566+05:30	2018-08-25 14:53:40.442+05:30	2018-08-25 14:53:40.442+05:30
webapp	C:/mycode/scipio-erp/framework/webapp/	2018-08-27 16:00:18.571+05:30	2018-08-27 16:00:18.571+05:30	2018-08-25 14:53:40.446+05:30	2018-08-25 14:53:40.446+05:30
widget	C:/mycode/scipio-erp/framework/widget/	2018-08-27 16:00:18.575+05:30	2018-08-27 16:00:18.575+05:30	2018-08-25 14:53:40.45+05:30	2018-08-25 14:53:40.45+05:30
testtools	C:/mycode/scipio-erp/framework/testtools/	2018-08-27 16:00:18.578+05:30	2018-08-27 16:00:18.578+05:30	2018-08-25 14:53:40.453+05:30	2018-08-25 14:53:40.453+05:30
webtools	C:/mycode/scipio-erp/framework/webtools/	2018-08-27 16:00:18.581+05:30	2018-08-27 16:00:18.581+05:30	2018-08-25 14:53:40.456+05:30	2018-08-25 14:53:40.456+05:30
images	C:/mycode/scipio-erp/framework/images/	2018-08-27 16:00:18.585+05:30	2018-08-27 16:00:18.585+05:30	2018-08-25 14:53:40.459+05:30	2018-08-25 14:53:40.459+05:30
base-theme	C:/mycode/scipio-erp/themes/base/	2018-08-27 16:00:18.588+05:30	2018-08-27 16:00:18.588+05:30	2018-08-25 14:53:40.461+05:30	2018-08-25 14:53:40.461+05:30
foundation-shop-theme	C:/mycode/scipio-erp/themes/foundation-shop/	2018-08-27 16:00:18.591+05:30	2018-08-27 16:00:18.591+05:30	2018-08-25 14:53:40.465+05:30	2018-08-25 14:53:40.464+05:30
metro-theme	C:/mycode/scipio-erp/themes/metro/	2018-08-27 16:00:18.594+05:30	2018-08-27 16:00:18.594+05:30	2018-08-25 14:53:40.469+05:30	2018-08-25 14:53:40.469+05:30
party	C:/mycode/scipio-erp/applications/party/	2018-08-27 16:00:18.597+05:30	2018-08-27 16:00:18.597+05:30	2018-08-25 14:53:40.472+05:30	2018-08-25 14:53:40.472+05:30
securityext	C:/mycode/scipio-erp/applications/securityext/	2018-08-27 16:00:18.602+05:30	2018-08-27 16:00:18.602+05:30	2018-08-25 14:53:40.475+05:30	2018-08-25 14:53:40.475+05:30
content	C:/mycode/scipio-erp/applications/content/	2018-08-27 16:00:18.605+05:30	2018-08-27 16:00:18.605+05:30	2018-08-25 14:53:40.478+05:30	2018-08-25 14:53:40.478+05:30
workeffort	C:/mycode/scipio-erp/applications/workeffort/	2018-08-27 16:00:18.609+05:30	2018-08-27 16:00:18.609+05:30	2018-08-25 14:53:40.48+05:30	2018-08-25 14:53:40.48+05:30
product	C:/mycode/scipio-erp/applications/product/	2018-08-27 16:00:18.611+05:30	2018-08-27 16:00:18.611+05:30	2018-08-25 14:53:40.483+05:30	2018-08-25 14:53:40.483+05:30
manufacturing	C:/mycode/scipio-erp/applications/manufacturing/	2018-08-27 16:00:18.614+05:30	2018-08-27 16:00:18.614+05:30	2018-08-25 14:53:40.485+05:30	2018-08-25 14:53:40.485+05:30
accounting	C:/mycode/scipio-erp/applications/accounting/	2018-08-27 16:00:18.617+05:30	2018-08-27 16:00:18.616+05:30	2018-08-25 14:53:40.487+05:30	2018-08-25 14:53:40.487+05:30
humanres	C:/mycode/scipio-erp/applications/humanres/	2018-08-27 16:00:18.619+05:30	2018-08-27 16:00:18.619+05:30	2018-08-25 14:53:40.49+05:30	2018-08-25 14:53:40.489+05:30
order	C:/mycode/scipio-erp/applications/order/	2018-08-27 16:00:18.623+05:30	2018-08-27 16:00:18.623+05:30	2018-08-25 14:53:40.492+05:30	2018-08-25 14:53:40.492+05:30
marketing	C:/mycode/scipio-erp/applications/marketing/	2018-08-27 16:00:18.626+05:30	2018-08-27 16:00:18.626+05:30	2018-08-25 14:53:40.494+05:30	2018-08-25 14:53:40.494+05:30
cms	C:/mycode/scipio-erp/applications/cms/	2018-08-27 16:00:18.63+05:30	2018-08-27 16:00:18.629+05:30	2018-08-25 14:53:40.497+05:30	2018-08-25 14:53:40.497+05:30
shop	C:/mycode/scipio-erp/applications/shop/	2018-08-27 16:00:18.633+05:30	2018-08-27 16:00:18.633+05:30	2018-08-25 14:53:40.5+05:30	2018-08-25 14:53:40.499+05:30
commonext	C:/mycode/scipio-erp/applications/commonext/	2018-08-27 16:00:18.639+05:30	2018-08-27 16:00:18.639+05:30	2018-08-25 14:53:40.502+05:30	2018-08-25 14:53:40.502+05:30
setup	C:/mycode/scipio-erp/applications/setup/	2018-08-27 16:00:18.642+05:30	2018-08-27 16:00:18.642+05:30	2018-08-25 14:53:40.504+05:30	2018-08-25 14:53:40.504+05:30
solr	C:/mycode/scipio-erp/applications/solr/	2018-08-27 16:00:18.645+05:30	2018-08-27 16:00:18.645+05:30	2018-08-25 14:53:40.53+05:30	2018-08-25 14:53:40.53+05:30
assetmaint	C:/mycode/scipio-erp/specialpurpose/assetmaint/	2018-08-27 16:00:18.648+05:30	2018-08-27 16:00:18.647+05:30	2018-08-25 14:53:40.533+05:30	2018-08-25 14:53:40.533+05:30
demosuite	C:/mycode/scipio-erp/specialpurpose/demosuite/	2018-08-27 16:00:18.652+05:30	2018-08-27 16:00:18.652+05:30	2018-08-25 14:53:40.535+05:30	2018-08-25 14:53:40.535+05:30
\.


--
-- Data for Name: tenant; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tenant (tenant_id, tenant_name, initial_path, disabled, last_updated_stamp, last_updated_tx_stamp, created_stamp, created_tx_stamp) FROM stdin;
\.


--
-- Data for Name: tenant_component; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tenant_component (tenant_id, component_name, sequence_num, last_updated_stamp, last_updated_tx_stamp, created_stamp, created_tx_stamp) FROM stdin;
\.


--
-- Data for Name: tenant_data_source; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tenant_data_source (tenant_id, entity_group_name, jdbc_uri, jdbc_username, jdbc_password, last_updated_stamp, last_updated_tx_stamp, created_stamp, created_tx_stamp) FROM stdin;
\.


--
-- Data for Name: tenant_domain_name; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tenant_domain_name (tenant_id, domain_name, last_updated_stamp, last_updated_tx_stamp, created_stamp, created_tx_stamp) FROM stdin;
\.


--
-- Data for Name: tenant_key_encrypting_key; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tenant_key_encrypting_key (tenant_id, kek_text, last_updated_stamp, last_updated_tx_stamp, created_stamp, created_tx_stamp) FROM stdin;
\.


--
-- Name: component pk_component; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.component
    ADD CONSTRAINT pk_component PRIMARY KEY (component_name);


--
-- Name: tenant pk_tenant; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tenant
    ADD CONSTRAINT pk_tenant PRIMARY KEY (tenant_id);


--
-- Name: tenant_component pk_tenant_component; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tenant_component
    ADD CONSTRAINT pk_tenant_component PRIMARY KEY (component_name, tenant_id);


--
-- Name: tenant_data_source pk_tenant_data_source; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tenant_data_source
    ADD CONSTRAINT pk_tenant_data_source PRIMARY KEY (tenant_id, entity_group_name);


--
-- Name: tenant_domain_name pk_tenant_domain_name; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tenant_domain_name
    ADD CONSTRAINT pk_tenant_domain_name PRIMARY KEY (domain_name);


--
-- Name: tenant_key_encrypting_key pk_tenant_key_encrypting_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tenant_key_encrypting_key
    ADD CONSTRAINT pk_tenant_key_encrypting_key PRIMARY KEY (tenant_id);


--
-- Name: comp_cnt; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX comp_cnt ON public.tenant_component USING btree (component_name);


--
-- Name: component_txcrts; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX component_txcrts ON public.component USING btree (created_tx_stamp);


--
-- Name: component_txstmp; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX component_txstmp ON public.component USING btree (last_updated_tx_stamp);


--
-- Name: tenant_txcrts; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX tenant_txcrts ON public.tenant USING btree (created_tx_stamp);


--
-- Name: tenant_txstmp; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX tenant_txstmp ON public.tenant USING btree (last_updated_tx_stamp);


--
-- Name: tnnt_cmpnnt_txcrts; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX tnnt_cmpnnt_txcrts ON public.tenant_component USING btree (created_tx_stamp);


--
-- Name: tnnt_cmpnnt_txstmp; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX tnnt_cmpnnt_txstmp ON public.tenant_component USING btree (last_updated_tx_stamp);


--
-- Name: tnnt_dmn_nm_txcrts; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX tnnt_dmn_nm_txcrts ON public.tenant_domain_name USING btree (created_tx_stamp);


--
-- Name: tnnt_dmn_nm_txstmp; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX tnnt_dmn_nm_txstmp ON public.tenant_domain_name USING btree (last_updated_tx_stamp);


--
-- Name: tnnt_dmnam; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX tnnt_dmnam ON public.tenant_domain_name USING btree (tenant_id);


--
-- Name: tnnt_dt_src_txcrts; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX tnnt_dt_src_txcrts ON public.tenant_data_source USING btree (created_tx_stamp);


--
-- Name: tnnt_dt_src_txstmp; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX tnnt_dt_src_txstmp ON public.tenant_data_source USING btree (last_updated_tx_stamp);


--
-- Name: tnt_k_encrg_k_txcs; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX tnt_k_encrg_k_txcs ON public.tenant_key_encrypting_key USING btree (created_tx_stamp);


--
-- Name: tnt_k_encrg_k_txsp; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX tnt_k_encrg_k_txsp ON public.tenant_key_encrypting_key USING btree (last_updated_tx_stamp);


--
-- Name: tntcomp_tnt; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX tntcomp_tnt ON public.tenant_component USING btree (tenant_id);


--
-- Name: tntdtsrc_tnt; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX tntdtsrc_tnt ON public.tenant_data_source USING btree (tenant_id);


--
-- Name: tntkek_tnt; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX tntkek_tnt ON public.tenant_key_encrypting_key USING btree (tenant_id);


--
-- Name: tenant_component comp_cnt; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tenant_component
    ADD CONSTRAINT comp_cnt FOREIGN KEY (component_name) REFERENCES public.component(component_name);


--
-- Name: tenant_domain_name tnnt_dmnam; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tenant_domain_name
    ADD CONSTRAINT tnnt_dmnam FOREIGN KEY (tenant_id) REFERENCES public.tenant(tenant_id);


--
-- Name: tenant_component tntcomp_tnt; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tenant_component
    ADD CONSTRAINT tntcomp_tnt FOREIGN KEY (tenant_id) REFERENCES public.tenant(tenant_id);


--
-- Name: tenant_data_source tntdtsrc_tnt; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tenant_data_source
    ADD CONSTRAINT tntdtsrc_tnt FOREIGN KEY (tenant_id) REFERENCES public.tenant(tenant_id);


--
-- Name: tenant_key_encrypting_key tntkek_tnt; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tenant_key_encrypting_key
    ADD CONSTRAINT tntkek_tnt FOREIGN KEY (tenant_id) REFERENCES public.tenant(tenant_id);


--
-- PostgreSQL database dump complete
--

