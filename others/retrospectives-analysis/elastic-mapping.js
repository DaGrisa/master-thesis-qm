{
    mappings: {
        retrospective: {
            properties: {
                gooddecisions: {
                    type: "text",
                    analyzer: "german",
                    fielddata: true
                },
                learnings: {
                    type: "text",
                    analyzer: "german",
                    fielddata: true
                },
                toimprove: {
                    type: "text",
                    analyzer: "german",
                    fielddata: true
                },
                annoying: {
                    type: "text",
                    analyzer: "german",
                    fielddata: true
                },
                date: {
                    type: "date",
                    format: "strict_date_optional_time||epoch_millis"
                }
            }
        }
    }
}
