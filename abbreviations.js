const abbreviationsData = [
    {
        category: "Модели и стандарты",
        items: [
            { abbr: "OSI", full: "Open Systems Interconnection", translation: "Взаимодействие открытых систем", description: "Эталонная модель взаимодействия открытых систем (7 уровней)" },
            { abbr: "TCP/IP", full: "Transmission Control Protocol/Internet Protocol", translation: "Протокол управления передачей/Межсетевой протокол", description: "Стек протоколов для сети Интернет" },
            { abbr: "IEEE", full: "Institute of Electrical and Electronics Engineers", translation: "Институт инженеров электротехники и электроники", description: "Организация, разрабатывающая стандарты в области электроники и сетевых технологий" }
        ]
    },
    {
        category: "Канальный уровень (L2)",
        items: [
            { abbr: "MAC", full: "Media Access Control", translation: "Управление доступом к среде", description: "Физический адрес сетевого интерфейса (48 бит)" },
            { abbr: "VLAN", full: "Virtual Local Area Network", translation: "Виртуальная локальная сеть", description: "Логическая группировка устройств в одной физической сети" },
            { abbr: "STP", full: "Spanning Tree Protocol", translation: "Протокол остовного дерева", description: "Протокол для предотвращения петель в сети" },
            { abbr: "RSTP", full: "Rapid Spanning Tree Protocol", translation: "Быстрый протокол остовного дерева", description: "Ускоренная версия STP (802.1w)" },
            { abbr: "LACP", full: "Link Aggregation Control Protocol", translation: "Протокол управления агрегацией каналов", description: "Протокол для объединения нескольких физических портов в один логический" },
            { abbr: "LLDP", full: "Link Layer Discovery Protocol", translation: "Протокол обнаружения канального уровня", description: "Протокол для обнаружения соседних устройств" },
            { abbr: "ARP", full: "Address Resolution Protocol", translation: "Протокол разрешения адресов", description: "Протокол для определения MAC-адреса по IP-адресу" },
            { abbr: "SVI", full: "Switch Virtual Interface", translation: "Виртуальный интерфейс коммутатора", description: "Виртуальный интерфейс для управления коммутатором" },
            { abbr: "PVID", full: "Port VLAN ID", translation: "Идентификатор VLAN порта", description: "VLAN, присвоенный порту по умолчанию для нетегированного трафика" },
            { abbr: "OUI", full: "Organizationally Unique Identifier", translation: "Уникальный идентификатор организации", description: "Первые 24 бита MAC-адреса, идентифицирующие производителя" },
            { abbr: "CAM", full: "Content Addressable Memory", translation: "Ассоциативная память", description: "Аппаратная таблица MAC-адресов в коммутаторе" }
        ]
    },
    {
        category: "Сетевой уровень (L3)",
        items: [
            { abbr: "IP", full: "Internet Protocol", translation: "Межсетевой протокол", description: "Основной протокол сетевого уровня (IPv4/IPv6)" },
            { abbr: "ICMP", full: "Internet Control Message Protocol", translation: "Межсетевой протокол управляющих сообщений", description: "Протокол для диагностики и проверки доступности (ping)" },
            { abbr: "DHCP", full: "Dynamic Host Configuration Protocol", translation: "Протокол динамической настройки узла", description: "Протокол для автоматического назначения IP-адресов" },
            { abbr: "DNS", full: "Domain Name System", translation: "Система доменных имён", description: "Система преобразования имён доменов в IP-адреса" },
            { abbr: "NAT", full: "Network Address Translation", translation: "Преобразование сетевых адресов", description: "Преобразование частных IP-адресов в публичные" },
            { abbr: "PAT", full: "Port Address Translation", translation: "Преобразование адресов портов", description: "NAT с использованием портов (многие к одному)" },
            { abbr: "VRRP", full: "Virtual Router Redundancy Protocol", translation: "Протокол резервирования виртуального маршрутизатора", description: "Протокол резервирования шлюза по умолчанию" },
            { abbr: "HSRP", full: "Hot Standby Router Protocol", translation: "Протокол горячего резервирования маршрутизатора", description: "Протокол резервирования шлюза (Cisco)" },
            { abbr: "ACL", full: "Access Control List", translation: "Список управления доступом", description: "Список правил для фильтрации трафика" },
            { abbr: "MTU", full: "Maximum Transmission Unit", translation: "Максимальный блок передачи", description: "Максимальный размер пакета, передаваемого за один раз" },
            { abbr: "TTL", full: "Time To Live", translation: "Время жизни", description: "Поле в IP-заголовке, предотвращающее зацикливание пакетов" }
        ]
    },
    {
        category: "Транспортный уровень (L4)",
        items: [
            { abbr: "TCP", full: "Transmission Control Protocol", translation: "Протокол управления передачей", description: "Надёжный протокол с установлением соединения" },
            { abbr: "UDP", full: "User Datagram Protocol", translation: "Протокол пользовательских датаграмм", description: "Протокол без установления соединения (быстрее, но ненадёжный)" },
            { abbr: "RTP", full: "Real-time Transport Protocol", translation: "Транспортный протокол реального времени", description: "Протокол для передачи аудио и видео" },
            { abbr: "RTCP", full: "RTP Control Protocol", translation: "Протокол управления RTP", description: "Протокол контроля качества для RTP" }
        ]
    },
    {
        category: "Протоколы маршрутизации",
        items: [
            { abbr: "OSPF", full: "Open Shortest Path First", translation: "Протокол кратчайшего пути", description: "Протокол внутренней маршрутизации на основе алгоритма Dijkstra" },
            { abbr: "RIP", full: "Routing Information Protocol", translation: "Протокол маршрутной информации", description: "Протокол маршрутизации на основе количества переходов (hops)" },
            { abbr: "BGP", full: "Border Gateway Protocol", translation: "Протокол пограничных шлюзов", description: "Протокол внешней маршрутизации между автономными системами" },
            { abbr: "EIGRP", full: "Enhanced Interior Gateway Routing Protocol", translation: "Улучшенный протокол внутренней маршрутизации", description: "Протокол маршрутизации Cisco" },
            { abbr: "IS-IS", full: "Intermediate System to Intermediate System", translation: "Промежуточная система к промежуточной системе", description: "Протокол маршрутизации для больших сетей" },
            { abbr: "AS", full: "Autonomous System", translation: "Автономная система", description: "Набор сетей под единым административным управлением" }
        ]
    },
    {
        category: "Безопасность",
        items: [
            { abbr: "SSH", full: "Secure Shell", translation: "Безопасная оболочка", description: "Протокол для безопасного удалённого доступа" },
            { abbr: "TLS", full: "Transport Layer Security", translation: "Безопасность транспортного уровня", description: "Протокол шифрования для защиты данных" },
            { abbr: "SSL", full: "Secure Sockets Layer", translation: "Уровень защищённых сокетов", description: "Предшественник TLS" },
            { abbr: "IPsec", full: "Internet Protocol Security", translation: "Безопасность межсетевого протокола", description: "Набор протоколов для защиты IP-соединений" },
            { abbr: "RADIUS", full: "Remote Authentication Dial-In User Service", translation: "Служба удалённой аутентификации", description: "Протокол для централизованной аутентификации" },
            { abbr: "AAA", full: "Authentication, Authorization, Accounting", translation: "Аутентификация, авторизация, учёт", description: "Концепция управления доступом" },
            { abbr: "VPN", full: "Virtual Private Network", translation: "Виртуальная частная сеть", description: "Технология создания защищённого канала через публичную сеть" }
        ]
    },
    {
        category: "Управление сетью",
        items: [
            { abbr: "SNMP", full: "Simple Network Management Protocol", translation: "Простой протокол управления сетью", description: "Протокол для управления и мониторинга сетевых устройств" },
            { abbr: "Syslog", full: "System Logging Protocol", translation: "Протокол системного логирования", description: "Протокол для отправки логов и системных сообщений" },
            { abbr: "NTP", full: "Network Time Protocol", translation: "Сетевой протокол времени", description: "Протокол для синхронизации времени" },
            { abbr: "SNTP", full: "Simple Network Time Protocol", translation: "Простой сетевой протокол времени", description: "Упрощённая версия NTP" },
            { abbr: "PTP", full: "Precision Time Protocol", translation: "Протокол точного времени", description: "Протокол для высокоточной синхронизации времени" },
            { abbr: "VRP", full: "Versatile Routing Platform", translation: "Универсальная платформа маршрутизации", description: "Операционная система для сетевых устройств Huawei" },
            { abbr: "VTY", full: "Virtual Terminal Lines", translation: "Виртуальные терминальные линии", description: "Линии для удалённого доступа (Telnet/SSH)" }
        ]
    },
    {
        category: "IPv6",
        items: [
            { abbr: "IPv6", full: "Internet Protocol version 6", translation: "Межсетевой протокол версии 6", description: "Протокол следующего поколения с 128-битными адресами" },
            { abbr: "NDP", full: "Neighbor Discovery Protocol", translation: "Протокол обнаружения соседей", description: "Протокол в IPv6, заменяющий ARP" },
            { abbr: "SLAAC", full: "Stateless Address Autoconfiguration", translation: "Автоконфигурация адресов без состояния", description: "Механизм автоматической настройки IPv6-адресов" },
            { abbr: "EUI-64", full: "Extended Unique Identifier-64", translation: "Расширенный уникальный идентификатор-64", description: "Метод формирования интерфейсного идентификатора в IPv6" },
            { abbr: "ULA", full: "Unique Local Address", translation: "Уникальный локальный адрес", description: "Частные IPv6-адреса (fc00::/7)" },
            { abbr: "DAD", full: "Duplicate Address Detection", translation: "Обнаружение дублирования адресов", description: "Процедура проверки уникальности адреса в IPv6" }
        ]
    },
    {
        category: "Технологии и концепции",
        items: [
            { abbr: "QoS", full: "Quality of Service", translation: "Качество обслуживания", description: "Механизмы приоритизации трафика" },
            { abbr: "DSCP", full: "Differentiated Services Code Point", translation: "Кодовая точка дифференцированного обслуживания", description: "Поле в IP-заголовке для указания класса обслуживания" },
            { abbr: "VoIP", full: "Voice over IP", translation: "Голос через IP", description: "Технология передачи голоса по IP-сетям" },
            { abbr: "SIP", full: "Session Initiation Protocol", translation: "Протокол инициирования сеансов", description: "Протокол для установки VoIP-сессий" },
            { abbr: "MPLS", full: "Multiprotocol Label Switching", translation: "Многопротокольная коммутация по меткам", description: "Технология коммутации, ускоряющая передачу данных" },
            { abbr: "VLSM", full: "Variable Length Subnet Mask", translation: "Маска подсети переменной длины", description: "Использование масок разной длины для оптимизации адресного пространства" },
            { abbr: "CIDR", full: "Classless Inter-Domain Routing", translation: "Бесклассовая междоменная маршрутизация", description: "Метод агрегации маршрутов" },
            { abbr: "FLSM", full: "Fixed Length Subnet Mask", translation: "Маска подсети фиксированной длины", description: "Все подсети имеют одинаковую маску" },
            { abbr: "APIPA", full: "Automatic Private IP Addressing", translation: "Автоматическое назначение частного IP", description: "Автоматическая настройка адреса при недоступности DHCP (169.254.0.0/16)" },
            { abbr: "P2P", full: "Peer-to-Peer", translation: "Равноправный узел к узлу", description: "Соединение между двумя устройствами напрямую" },
            { abbr: "RFC", full: "Request For Comments", translation: "Запрос комментариев", description: "Документ со стандартами и спецификациями для Интернета" }
        ]
    },
    {
        category: "Анализ трафика",
        items: [
            { abbr: "PDU", full: "Protocol Data Unit", translation: "Единица данных протокола", description: "Блок данных определённого уровня модели OSI" },
            { abbr: "BPF", full: "Berkeley Packet Filter", translation: "Фильтр пакетов Беркли", description: "Синтаксис для фильтров захвата в Wireshark/tcpdump" },
            { abbr: "PCAP", full: "Packet Capture", translation: "Захват пакетов", description: "Формат файлов для сохранения захваченного трафика" }
        ]
    }
];
