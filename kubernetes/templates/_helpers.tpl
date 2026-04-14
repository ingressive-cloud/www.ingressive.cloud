{{/*
Expand the name of the chart.
*/}}
{{- define "ingressive-www.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
*/}}
{{- define "ingressive-www.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- include "ingressive-www.name" . }}
{{- end }}
{{- end }}

{{/*
Chart labels
*/}}
{{- define "ingressive-www.labels" -}}
helm.sh/chart: {{ printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{ include "ingressive-www.selectorLabels" . }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "ingressive-www.selectorLabels" -}}
app.kubernetes.io/name: {{ include "ingressive-www.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}
