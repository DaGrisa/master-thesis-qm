# Textanalyse mit ElasticSearch

Grundlegender Artikel: https://www.elastic.co/blog/text-classification-made-easy-with-elasticsearch

## Index anlegen und Schema defnieren
Artikel in der Dokumentation: https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping.html#CO205-7
Bei den Mappings muss der Analyzer auf die entsprechende Sprache gestellt werden, in diesem Fall "german"
```
{
    "type":{
       "field":{
          "type":"text",
          "analyzer":"german"
       }
    }
  }
```

Index anlegen:
```
curl -XPUT 'localhost:9200/retrospectives?pretty' -H 'Content-Type: application/json' -d'
{
    "mappings" : {
        "retrospective": {
            "properties": {
                "gooddecisions": {
                    "type": "text",
                    "analyzer": "german",
                    "fielddata": true
                },
                "learnings": {
                    "type": "text",
                    "analyzer": "german",
                    "fielddata": true
                },
                "toimprove": {
                    "type": "text",
                    "analyzer": "german",
                    "fielddata": true
                },
                "annoying": {
                    "type": "text",
                    "analyzer": "german",
                    "fielddata": true
                },
                "date": {
                    "type": "date",
                    "format": "strict_date_optional_time||epoch_millis"
                }
            }
        }
    }
}
'
```

## Daten indizieren

Die Daten an die Bulk Schnittstelle senden: https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-bulk.html

## Über Terms Aggregationen die Top Keywords abfragen

```
{
    "query" : {
      "match_all" : {}
    },
    "aggregations" : {
        "retrospectives" : {
            "terms" : { 
            	"field" : "annoying", 
            	"size" : 25,
				"exclude" : ["beim", "dev", "gibt", "geh", "2", "egal", "45", "softwar", "off", "minut", "gest", "best"]
            }
        }
    }
}
```

```
{
    "query" : {
      "match_all" : {}
    },
    "aggregations" : {
        "retrospectives" : {
            "terms" : { 
            	"field" : "toimprove", 
            	"size" : 25,
				"exclude" : ["beim", "dev", "gibt", "geh", "2", "egal", "45", "softwar", "off", "minut", "gest", "best", "bess", "gemacht", "mehr", "wenig", "nehm", "angeb", "moglich", "bevor"]
            }
        }
    }
}
```

```
{
    "query" : {
      "match_all" : {}
    },
    "aggregations" : {
        "retrospectives" : {
            "terms" : { 
            	"field" : "gooddecisions", 
            	"size" : 25,
				"exclude" : ["beim", "dev", "gibt", "geh", "2", "egal", "45", "softwar", "off", "minut", "gest", "best", "bess", "gemacht", "mehr", "wenig", "nehm", "angeb", "moglich", "bevor", "gut", "sieh", "sollt", "bring", "dadurch", "dringened"]
            }
        }
    }
}
```

```
{
    "query" : {
      "match_all" : {}
    },
    "aggregations" : {
        "retrospectives" : {
            "terms" : { 
            	"field" : "learnings", 
            	"size" : 25,
				"exclude" : ["beim", "dev", "gibt", "geh", "2", "egal", "45", "softwar", "off", "minut", "gest", "best", "bess", "gemacht", "mehr", "wenig", "nehm", "angeb", "moglich", "bevor", "gut", "sieh", "sollt", "bring", "dadurch", "dringened", "muss", "aufnehm", "fehlt", "geb", "gleich", "gross", "innerhalb", "lang", "mal", "nach", "wer", "beachtet", "for", "gang", "interteamisch"]
            }
        }
    }
}
```
